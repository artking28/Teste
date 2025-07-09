import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserCache} from "@app/share/cache/UserCache";
import {UserService} from "@app/share/services/user.service";
import Utils from "@app/share/utils";
import {GlobalsVars} from "@app/share/globalsVars";

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {

    constructor(private userService: UserService) {
    }

    canActivate(): boolean {
        const user = UserCache.getInstance()
        if (!user.ok) {
            location.replace('/login')
        }

        if(user.kind == 'admin' || location.pathname == '/users') {
            location.replace('/addresses')
        }

        return true;
    }
}
