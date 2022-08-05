import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { BlogsService } from './services/blogs.service';
import { AuthGuard } from './guards/auth-guard.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SignupComponent,
    NoAccessComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forRoot([
        { 
            path: '', 
            component: HomeComponent,
            canActivate: [AuthGuard]
        },
        { 
            path: 'login', 
            component: LoginComponent,
        },
        { path: 'no-access', component: NoAccessComponent },
        { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    AuthService,
    BlogsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
