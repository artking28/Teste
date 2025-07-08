import {User} from "@app/share/models/User";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";


export class UserCache {

    public static USER_INFO: string = "USER_INFO"

    static signInCache(lrd: LoginResponseDTO,  reload: boolean): void {
        localStorage.setItem(this.USER_INFO, JSON.stringify(lrd));
        if(reload) {
            location.assign('/users')
        }
    }

    static signOutCache(): void {
        localStorage.clear()
        location.reload()
    }

    static getInstance(): LoginResponseDTO {
        const cache = localStorage.getItem(this.USER_INFO)
        if(cache) {
            return Object.assign(new LoginResponseDTO(), JSON.parse(cache));
        }
        return new LoginResponseDTO()
    }

    static changeTheme() {
        let actual = this.getInstance()
        if(!actual) {
            UserCache.signOutCache()
            return
        }
        actual.dark = !actual.dark
        UserCache.signInCache(actual, false)
    }
}
