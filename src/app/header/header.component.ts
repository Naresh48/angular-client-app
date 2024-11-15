import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string | null = null;
  showHeader: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.signedIn.subscribe(signedIn => {
      this.showHeader = signedIn;
      this.username = localStorage.getItem('username');
    });
  }

}
