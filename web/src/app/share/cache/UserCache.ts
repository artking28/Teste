import {User} from "@app/share/models/User";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";


export class UserCache {

    public static USER_INFO: string = "USER_INFO"

    static signInCache(lrd: LoginResponseDTO,  reload: boolean): void {
        localStorage.setItem(this.USER_INFO, JSON.stringify(lrd));
        if(reload) {
            location.reload();
        }

    }

    static signOutCache(reload: boolean): void {

    }

    static getInstance(): LoginResponseDTO | undefined {
        const cache = localStorage.getItem(this.USER_INFO)
        if(cache) {
            Object.assign(JSON.parse(cache), LoginResponseDTO);
        }
        return undefined
    }

    static isUserOk(): User {
        const raw = new User()
        const user = localStorage.getItem("User")
        if (user != null) {
            return User.adapt(JSON.parse(user))
        }
        localStorage.setItem("User", JSON.stringify(raw))
        return raw
    }
}
