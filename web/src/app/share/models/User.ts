import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";
import {IndexableID} from "@app/share/models/utility/Indexable";
import {GlobalsVars} from "@app/share/globalsVars";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";

export class User extends IndexableID<User> {
    public nickname: string;
    public name: string;
    public email: string;
    public password: string;
    public language: string;
    public darkTheme: boolean;
    public kind: 'member' | 'admin' = 'member';

    constructor(nickname?: string) {
        super();
        if(nickname) {
            this.nickname = nickname
        }
    }

    public static adapt(object: User): User {
        return Object.assign(new User(), object)
    }

    public formToSelf(form: FormGroup): User {
        return User.adapt(form.getRawValue())
    }

    toFormGroup(validators?: ValidatorsMap): FormGroup {
        if (!validators) {
            validators = new ValidatorsMap()
        }
        return new FormGroup({
            id: new FormControl(this.id, validators.fields.get("id")),
            name: new FormControl(this.name, validators.fields.get("name") ?? [Validators.required]),
            nickname: new FormControl(this.nickname, validators.fields.get("nickname") ?? [Validators.required]),
            email: new FormControl(this.email, validators.fields.get("email") ?? [Validators.required, Validators.email, Validators.pattern(GlobalsVars.EMAIL_PATTERN)]),
            password: new FormControl(this.password, validators.fields.get("password") ?? [Validators.required]),
            language: new FormControl(this.language, validators.fields.get("language") ?? [Validators.required]),
            darkTheme: new FormControl(this.darkTheme, validators.fields.get("darkTheme") ?? []),
            kind: new FormControl(this.kind, validators.fields.get("kind") ?? [Validators.required]),
        });
    }

    toLRO(time: Date): LoginResponseDTO {
        let ret = new LoginResponseDTO()
        ret.name = this.name
        ret.nickname = this.nickname
        ret.email = this.email
        ret.language = this.language
        ret.dark = this.darkTheme
        ret.loginAt = time
        return ret
    }
}
