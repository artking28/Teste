import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {User} from "@app/share/models/User";

@Injectable({
    providedIn: 'root'
})
export class UserService extends IRootService<User> {

    getServiceUrl(): string {
        return "/user"
    }

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    prepareSave(newObj: User): User {
        return newObj
    }
}
