import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {GlobalsVars} from "@app/share/globalsVars";


@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrl: 'dashboard.component.scss',
})
export class UsersComponent extends BasePiece {

    constructor() {
        super();
        GlobalsVars.PAGE_TITLE_CONTROL.emit("Users")
    }
}
