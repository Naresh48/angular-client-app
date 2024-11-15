import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService ){}

  ngOnInit(){
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
