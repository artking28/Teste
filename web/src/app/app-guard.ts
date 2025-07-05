import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserCache} from "@app/share/cache/UserCache";
import {UserService} from "@app/share/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {

    constructor(private userService: UserService) {
    }

    canActivate(): boolean {
        if (!UserCache.isUserOk()) {
            location.replace('/login')
        }
        return true;
    }
}
