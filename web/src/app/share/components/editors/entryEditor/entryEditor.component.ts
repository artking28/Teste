import {Component} from "@angular/core";
import {ModalEditor} from "@app/share/founding-files/base-piece";
import {Entry} from "@app/share/models/Entry";


@Component({
    standalone: false,
    selector: 'entry-editor',
    templateUrl: 'entryEditor.component.html',
    styleUrl: 'entryEditor.component.scss',
})
export class EntryEditorComponent extends ModalEditor<Entry> {

    ngOnInit(): void {

    }

    getZeroObject(): Entry {
        return new Entry();
    }
}
