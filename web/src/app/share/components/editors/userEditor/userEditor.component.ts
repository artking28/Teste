import {Component} from "@angular/core";
import {ModalEditor} from "@app/share/founding-files/base-piece";
import {User} from "@app/share/models/User";


@Component({
    standalone: false,
    selector: 'user-editor',
    templateUrl: 'userEditor.component.html',
    styleUrl: 'userEditor.component.scss',
})
export class UserEditorComponent extends ModalEditor<User> {

    ngOnInit(): void {

    }

    getZeroObject(): User {
        return new User();
    }
}
