import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {User} from "@app/share/models/User";
import {GenericResponse} from "@app/share/models/generic-response";
import {Address} from "@app/share/models/Address";
import {map} from "rxjs/operators";
import {UserCache} from "@app/share/cache/UserCache";

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

    findChildren() {
        return this.httpService.get<GenericResponse<User[]>>(`/proxy${this.getServiceUrl()}/findChildren`)
            .pipe(map(response => GenericResponse.adapt(response)))
    }

    changeTheme() {
        return this.httpService.get<GenericResponse<User[]>>(`/proxy${this.getServiceUrl()}/changeTheme`)
            .pipe(map(response => GenericResponse.adapt(response)))
    }
}
