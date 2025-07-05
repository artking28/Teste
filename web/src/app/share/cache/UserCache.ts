import {User} from "@app/share/models/User";


export class UserCache {


    static signOutCache(reload: boolean): void {
        localStorage.removeItem("Token")
        localStorage.removeItem("Commerce")
        localStorage.setItem("User", JSON.stringify(new User()))
        // localStorage.removeItem("Cart")
        if (reload) {
            location.replace("account");
            // this.router.navigateByUrl("/dashboard")
        }
    }

    static getUserLocalStorage(): User {
        const raw = new User()
        const user = localStorage.getItem("User")
        if (user != null) {
            return User.adapt(JSON.parse(user))
        }
        localStorage.setItem("User", JSON.stringify(raw))
        return raw
    }
}
