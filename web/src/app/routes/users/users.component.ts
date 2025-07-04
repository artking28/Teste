import {Component} from "@angular/core";
import {GlobalsVars} from "@app/share/globalsVars";
import {AbstractListarComponent} from "@app/share/components/utils/abstract-listar/abstract-listar.component";
import {User} from "@app/share/models/User";
import {UserService} from "@app/share/services/user.service";
import {ModalObject} from "@app/share/modal-summoner";
import {UserEditorComponent} from "@app/share/components/editors/userEditor/userEditor.component";
import {StructsModule} from "@app/share/components/structs.module";


@Component({
    selector: 'dashboard',
    templateUrl: '../../share/components/utils/abstract-listar/abstract-listar.component.html',
    styleUrls: ['users.component.scss', '../../share/components/utils/abstract-listar/abstract-listar.component.scss'],
    imports: [StructsModule,]
})
export class UsersComponent extends AbstractListarComponent<User> {

    constructor(private userService: UserService) {
        super(User, userService);
        GlobalsVars.PAGE_TITLE_CONTROL.emit("Users")
    }

    public override getTableColumns(): string[] {
        return ['name']
    }

    override getEditModalConfig(): ModalObject {
        return new ModalObject(
            "openRoleEditorModal",
            new Map<string, any>([]),
            UserEditorComponent,
        )
    }
}
