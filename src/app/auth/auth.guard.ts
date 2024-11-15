import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {

  constructor(private authService: AuthService, private router: Router) { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    const username = localStorage.getItem('username');
    if (username) {
      return true
      // return this.authService.signedIn.pipe(
      //   skipWhile(value => value === null),
      //   take(1),
      //   tap(authenticated => {
      //     if (!authenticated) {
      //       this.router.navigateByUrl('/');
      //       return false
      //     }
      //     return true
      //   })
      // );
    } else {
      return false
    }

  }

}
