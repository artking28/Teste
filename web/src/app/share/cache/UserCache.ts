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

    static getInstance(): LoginResponseDTO | undefined {
        const cache = localStorage.getItem(this.USER_INFO)
        if(cache) {
            return Object.assign(JSON.parse(cache), LoginResponseDTO);
        }
        return undefined
    }

    static isUserOk(): boolean {
        return this.getInstance() != undefined
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
