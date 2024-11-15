import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string = '';
  private _signedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  signedIn = this._signedIn.asObservable();
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  // Check if the user is logged in
  private isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this._signedIn.next(true);
          this.username = username;
          localStorage.setItem('username', username);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this._signedIn.next(false);
        localStorage.removeItem('username');
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this._signedIn.next(true);
          this.username = username;
          localStorage.setItem('username', username);
        })
      );
  }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, { username });
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this._signedIn.next(authenticated);
          this.username = username;
          if (authenticated && username) {
            localStorage.setItem('username', username);
          }
        })
      );
  }

}
