import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { withInterceptors , provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './auth/auth-http-interceptor';
import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Change position as needed
    }),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]) // Register the interceptor here
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
