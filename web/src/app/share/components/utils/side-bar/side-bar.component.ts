import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";


@Component({
    standalone: false,
    selector: 'side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['side-bar.components.scss']
})
export class SideBarComponent extends BasePiece {

    constructor() {
        super();


    }

    isThisActive(...opts: string[]): boolean {
        const where: string = location.pathname.substring(1)
        return opts.includes(where)
    }
}
