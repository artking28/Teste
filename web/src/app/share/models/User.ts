import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";
import {IndexableID} from "@app/share/models/utility/Indexable";
import {GlobalsVars} from "@app/share/globalsVars";

export class User extends IndexableID<User> {
    public nickname: string;
    public name: string;
    public email: string;
    public password: string;
    public language: string;

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
        });
    }
}
