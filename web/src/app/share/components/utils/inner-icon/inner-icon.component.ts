import {Component, Input, OnInit} from "@angular/core";

@Component({
    standalone: false,
    selector: 'inner-icon',
    templateUrl: 'inner-icon.component.html',
    styleUrls: ['./inner-icon.component.scss'],
})
export class InnerIconComponent implements OnInit {

    @Input()
    origin: 'fontAwesome' | 'google'

    @Input()
    identifier: string

    @Input()
    size: string

    ngOnInit(): void {
        // If either both or one of them is null, an error will be triggered.
        if(!this.origin || !this.identifier) {
            throw "Inner-icon origin or identifier is null, complete the input"
        }
    }
}









