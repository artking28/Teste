import {EventEmitter, Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DataUtil} from "@app/share/models/utility/DataUtil";
import {UserEditorComponent} from "@app/share/components/editors/userEditor/userEditor.component";
import {Result} from "@app/share/models/utility/Result";
import {Uuid} from "@app/share/models/utility/Uuid";
import {User} from "@app/share/models/User";


export class ModalObject {

    name: string = new Uuid().toString();
    component: any;
    data: any
    customConfigs: Map<string, string> = new Map<string, string>();
    emitter: EventEmitter<Result> = new EventEmitter()

    constructor(name: string, customConfigs: Map<string, string>, component: any) {
        this.name = name;
        this.customConfigs = customConfigs;
        this.component = component;
    }
}

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

    private static openModal(dialogConfig: MatDialogConfig, component: any, triggerClose?: EventEmitter<any>): void {

        const body = document.body
        body.style.overflow = 'hidden'

        this.dialog.open(component, dialogConfig).afterClosed().subscribe((result) => {
            body.style.overflow = ''
            if(triggerClose) triggerClose.emit(result);
        });
    }

    public static getDefaultDialogConfig(data: any, autoFocus: boolean): MatDialogConfig {
        return {
            panelClass: 'custom-modalbox',
            disableClose: false,
            minHeight: 'unset',
            maxWidth: 'unset',
            height: 'min-content',
            autoFocus: autoFocus,
            data: data
        }
    }

    public static openFromModalObject(modal: ModalObject): void {
        if (this.controlDuplicate(modal.name, modal.emitter)) {
            const conf = ModalSummoner.getDefaultDialogConfig(modal.data, true)
            Array.from(modal.customConfigs.keys()).forEach((key) => {
                (conf as any)[key] = modal.customConfigs.get(key)
            })
            this.openModal(conf, modal.component, modal.emitter)
        }
    }

    public static openUserEditor(emitter: EventEmitter<Result>, data: DataUtil<User>) {
        if (this.controlDuplicate("openUserEditor", emitter)) {
            const conf = ModalSummoner.getDefaultDialogConfig(data, false)
            conf.height = 'min-content'
            this.openModal(conf, UserEditorComponent, emitter)
        }
    }
}
