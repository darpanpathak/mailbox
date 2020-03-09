import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private localStorageService: LocalStorageService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const activeUser = this.localStorageService.getActiveUser();
        if (activeUser && activeUser.email) {
            return true;
        } else {
            this.router.navigate(['auth', 'login']);
        }
    }
}
