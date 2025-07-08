import {Component} from "@angular/core";
import {ModalEditor} from "@app/share/founding-files/base-piece";
import {User} from "@app/share/models/User";
import {FormControl, Validators} from "@angular/forms";
import Utils from "@app/share/utils";


@Component({
    standalone: false,
    selector: 'user-editor',
    templateUrl: 'userEditor.component.html',
    styleUrl: 'userEditor.component.scss',
})
export class UserEditorComponent extends ModalEditor<User> {

    ngOnInit(): void {
        this.object = User.adapt(this.object)
        this.form = this.object.toFormGroup()

        if (this.isEditing) {
            this.form.removeControl("password")
            this.form.removeControl("confirm")
            this.form.removeControl("kind")
            return
        }

        const value: string = this.object?.password ?? (this.object as any).password  ?? ""
        const validators: any[] = [
            Validators.required,
            Utils.diffFields("password", "confirm")
        ]

        this.form.addControl("password", new FormControl(value, validators))
        this.form.addControl("confirm", new FormControl(value, validators))
    }

    getZeroObject(): User {
        return new User();
    }
}
