import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css'
})
export class EmailReplyComponent implements OnInit{

  showModal:boolean = false;
  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: ''
  };

  constructor(private emailService: EmailService){}

  ngOnInit(){
    const text = this.email.text.replace(/\n/gi, '\n> ');

    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote:\n> ${text}`
    };

  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.modalClose()
    });
  }

  modalOpen(){
    this.showModal = true;
  }

  modalClose(){
    this.showModal =false;
  }

}
