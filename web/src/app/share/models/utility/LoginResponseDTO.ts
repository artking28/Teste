import {User} from "@app/share/models/User";

export class LoginResponseDTO {
    ok: boolean = false;
    name: string;
    nickname: string;
    email: string;
    language: string;
    dark: boolean;
    token: string;
    kind: 'member' | 'admin';
    loginAt = new Date();

    toUser(): User {
        let ret = new User()
        ret.name = this.name
        ret.nickname = this.nickname
        ret.email = this.email
        ret.language = this.language
        ret.darkTheme = this.dark
        ret.kind = this.kind
        return ret
    }
}
