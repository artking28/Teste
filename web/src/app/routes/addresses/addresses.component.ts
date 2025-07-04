import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {GlobalsVars} from "@app/share/globalsVars";


@Component({
    selector: 'recurring-component',
    templateUrl: 'recurring.component.html',
    styleUrl: 'recurring.component.scss',
})
export class AddressesComponent extends BasePiece {

    constructor() {
        super();
        GlobalsVars.PAGE_TITLE_CONTROL.emit("Addresses")
    }
}
