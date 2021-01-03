import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private token_service: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const currentUser = this.token_service.getUser().user;
        //console.log(currentUser);
        const lunchLadyRole = route.data.lunchLadyRole;
        if(currentUser) {
            //check if route is restricted by role
            if(lunchLadyRole !== undefined && currentUser.isLunchLady !== lunchLadyRole)  {
                this.router.navigate(['/']);
                return false;
            }
            
            console.log("fin 1");
            //authorised so return true
            return true;
        }
    }
}