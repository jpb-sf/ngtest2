import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, of, from } from 'rxjs';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    isAuthenticated:boolean = false;

    constructor(private router: Router) {
    }
    //  SERVICE ISN'T WORKING FOR '/LOGIN' BECAUSE '/LOGIN' ISN'T INITIATING THIS CLASS AND FIRING UP THE OBSERVER
    // Gotta have a subscription here right? Keeps it actively running for logout().
    // observeAuth = this.authService.isAuthenticatedSubject.subscribe((next: boolean) => 
    //     {   
    //         // below - this does fire until it receives a value. no 'step in'.
    //         console.log('observer of isAuthenticatedSubject has received a value')
    //         this.isAuthenticated = next;
    //         // if false (from logout()), navigate to login
    //         if(!this.isAuthenticated)
    //         {   
    //             console.log('observer is sending us to login')
    //             this.router.navigate(['/login'])
    //         }
    //         else {
    //             console.log('routing to home from observer')
    //             this.router.navigate(['/'])
    //         }
    //         // if isAuthenticated receives true value, the navigate to '/' from the login() ..
    //         // activates the canActivate and receives the true value below
    //         return;
    //     })
    
    isAuth(val: boolean)
    {
        this.isAuthenticated = val;
        if(!this.isAuthenticated)
        {   
            console.log('observer is sending us to login')
            this.router.navigate(['/login'])
        }
        else {
            console.log('routing to home from observer')
            this.router.navigate(['/'])
        }
    }
           
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log('can Activate initiated')
      
        if (this.isAuthenticated) { return true};
        console.log('canActivate rejected')
        // routes to login, canActivate is closed
        return this.router.navigate(['/login'])
    }
};

    
