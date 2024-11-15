import { Component, Input, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css'
})
export class EmailCreateComponent implements OnInit {

  showModal: Boolean = false;
  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: ''
  };

  constructor(private emailService: EmailService, private authService: AuthService) {
   }


  ngOnInit() {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${localStorage.getItem('username')}@angular-email.com`
    };
   }


  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.modalClose()
    });
  }

  modalOpen() {
    this.showModal = true;
  }

  modalClose() {
    this.showModal = false;
  }


}
