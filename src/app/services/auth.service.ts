import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/users';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';

const httpHeader = {
    'Content-Type': 'application/json'
};

const db = "http://localhost:3000";

@Injectable()
export class AuthService {
    // **how would I write an observable form of isLoggedIn?
    isAuthenticatedSubject: Subject<any> = new Subject();
    user: string = '';
    
    constructor(private http: HttpClient, private router: Router,private authGuard: AuthGuard) {
    }
    // WORKING FOR BOTH CONDITIONS BUT NOT EVERTIME, timing thing?
    login(username: string, password: string) { 

        return this.http.get(db + '/user/' + username)
            .subscribe((theGoods) => { 
                let goodies = theGoods as User[];
                const userPW = goodies[0]['password'];
                console.log(userPW)
                
                if (password === userPW)
                {   
                    console.log('passwords checkout')
                    this.user = username;
                    localStorage.setItem('user', username);
                    localStorage.setItem('password', password);
                    // below activates authGuard if '/login' is first.
                    
                    this.authGuard.isAuth(true);
                    
                    return
                }
                else{
                    this.router.navigate(['no-access']);
                    return false;
                }
        });
    }

  
    getUsername()
    {
        return this.user;
    }

    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('password')
        localStorage.clear()
        this.user = ''; 
        this.authGuard.isAuth(false)
        console.log('logout')
    }
}

