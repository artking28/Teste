import {EventEmitter, inject, Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DataUtil} from "@app/share/models/utility/DataUtil";
import {Entry} from "@app/share/models/Entry";
import {EntryEditorComponent} from "@app/share/components/editors/entryEditor/entryEditor.component";
import {Result} from "@app/share/models/utility/Result";

@Injectable({
    providedIn: 'root'
})
export class ModalSummoner {

    private static preventDuplicate = new Map<string, boolean>()

    private static dialog: MatDialog

    static init(dialog: MatDialog) {
        ModalSummoner.dialog = dialog
    }

    private static controlDuplicate(modalKey: string, emitter: EventEmitter<any>): boolean {
        if (this.preventDuplicate.get(modalKey) == false || this.preventDuplicate.get(modalKey) == null) {
            this.preventDuplicate.set(modalKey, true)
            emitter.subscribe((_) => {
                this.preventDuplicate.set(modalKey, false)
            })
            return true
        }
        return false
    }

    private static openModal(dialogConfig: MatDialogConfig, component: any, triggerClose: EventEmitter<any>): void {

        const html = document.getElementsByTagName("html")[0]
        const body = document.body
        body.style.overflow = 'hidden'
        html.style.height = `${window.innerHeight + window.scrollY}px`

        this.dialog.open(component, dialogConfig).afterClosed().subscribe((result) => {
            body.style.overflow = ''
            html.style.height = ''
            triggerClose.emit(result);
        });
    }

    public static getDefaultDialogConfig(data: any, autoFocus: boolean): MatDialogConfig {
        return {
            panelClass: 'custom-modalbox',
            disableClose: false,
            minHeight: 'unset',
            maxWidth: 'unset',
            autoFocus: autoFocus,
            data: data
        }
    }

    public static openEntryEditor(emitter: EventEmitter<Result>, data: DataUtil<Entry>) {
        if (this.controlDuplicate("openEntryEditor", emitter)) {
            const conf = ModalSummoner.getDefaultDialogConfig(data, false)
            conf.height = 'min-content'
            this.openModal(conf, EntryEditorComponent, emitter)
        }
    }
}
