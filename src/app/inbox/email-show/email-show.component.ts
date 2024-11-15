import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css'
})
export class EmailShowComponent implements OnInit{

  email:Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: ''
  };

  constructor(private activateRoute: ActivatedRoute){
    
    ////for first time snapshot
    this.email = activateRoute.snapshot.data?.['email'];

    ///after we toggling emails, we need this
    this.activateRoute.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit(){
  }

}
