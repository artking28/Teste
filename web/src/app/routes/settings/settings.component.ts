import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {GlobalsVars} from "@app/share/globalsVars";


@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html',
    styleUrl: 'settings.component.scss',
})
export class SettingsComponent extends BasePiece {

    constructor() {
        super();
        GlobalsVars.PAGE_TITLE_CONTROL.emit("Settings")
    }
}
