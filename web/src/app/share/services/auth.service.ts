import {Injectable} from "@angular/core";
import {Service} from "@app/share/IService.service";
import {Observable} from "rxjs";
import {GenericResponse} from "@app/share/models/generic-response";
import {RequestOptions} from "@app/share/models/utility/RequestOptions";
import {map} from "rxjs/operators";
import {User} from "@app/share/models/User";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends Service {

    getServiceUrl(): string {
        return "/api/auth"
    }

    login(nickname: string, password: string): Observable<GenericResponse<LoginResponseDTO>> {
        return this.httpService.post<GenericResponse<LoginResponseDTO>>(`/proxy${this.getServiceUrl()}/login`, { nickname, password }, new RequestOptions(false))
            .pipe(map(response => GenericResponse.adapt(response)))
    }

    signup(user: User): Observable<GenericResponse<LoginResponseDTO>> {
        return this.httpService.post<GenericResponse<LoginResponseDTO>>(`/proxy${this.getServiceUrl()}/signUp`, user, new RequestOptions(false))
            .pipe(map(response => GenericResponse.adapt(response)));
    }
}
