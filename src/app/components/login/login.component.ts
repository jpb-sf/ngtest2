import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    // @Output() userEmitter = new EventEmitter;
    
    constructor(fb: FormBuilder, private auth: AuthService) {
        this.form = fb.group({
            username: [],
            password: []
         })
     }  

    ngOnInit(): void {
        //  Won't work on home, because home is blocked and just routed to '/login'. 
        // This wouldn't work in AuthGuard if '/login' is directly accessed bc AuthGuard is never initiated with /login
        // Perfect in login though as covers both itself '/login' and '/' 
        if(localStorage.getItem('user') && localStorage.getItem('password'))
        {   
            this.auth.login(localStorage.getItem('user')!, localStorage.getItem('password')!)
        }
    }
    
    login(): void {
        const credentials = this.form.getRawValue()
        let user = this.auth.login(credentials.username, credentials.password)
        this.form.reset();
    }
       
}
