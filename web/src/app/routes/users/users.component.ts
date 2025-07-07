import {Component} from "@angular/core";
import {GlobalsVars} from "@app/share/globalsVars";
import {AbstractListarComponent} from "@app/share/components/utils/abstract-listar/abstract-listar.component";
import {User} from "@app/share/models/User";
import {UserService} from "@app/share/services/user.service";
import {ModalObject} from "@app/share/modal-summoner";
import {UserEditorComponent} from "@app/share/components/editors/userEditor/userEditor.component";
import {StructsModule} from "@app/share/components/structs.module";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {GenericResponse} from "@app/share/models/generic-response";


@Component({
    selector: 'user-component',
    templateUrl: '../../share/components/utils/abstract-listar/abstract-listar.component.html',
    styleUrls: ['users.component.scss', '../../share/components/utils/abstract-listar/abstract-listar.component.scss'],
    imports: [StructsModule, MatSortHeader, MatSort, MatPaginator,]
})
export class UsersComponent extends AbstractListarComponent<User> {

    constructor(private userService: UserService) {//398a40
        super(User, userService);
        GlobalsVars.PAGE_TITLE_CONTROL.emit("my.users")
    }

    public override getDefaultListObservable(): Observable<GenericResponse<User[]>> {
        return this.userService.findChildren();
    }

    public override getTableColumns(): string[] {
        return ['id', 'name', 'email', 'createdAt']
    }

    public beforeEdit(obj: User): User {
        return User.adapt(obj)
    }

    override getEditModalConfig(): ModalObject {
        return new ModalObject(
            "openRoleEditorModal",
            new Map<string, any>([]),
            UserEditorComponent,
        )
    }
}
