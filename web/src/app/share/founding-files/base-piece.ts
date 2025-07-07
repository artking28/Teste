
import {Directive, HostListener, inject, Injectable, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {clone} from "underscore";
import {FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {HttpUtils} from "@app/share/founding-files/http.utils";
import {GlobalsVars} from "@app/share/globalsVars";
import {UserCache} from "@app/share/cache/UserCache";
import {Indexable, IndexableID, IndexableUUID} from "@app/share/models/utility/Indexable";
import {DataUtil} from "@app/share/models/utility/DataUtil";
import {None, Result, Some} from "@app/share/models/utility/Result";
import {Color} from "@app/share/models/utility/Color";
import Utils from "@app/share/utils";


// This class should be extended from visual components and it provides basic properties which are contantly used
@Injectable({
    providedIn: 'root'
})
export abstract class BasePiece {

    // Offers support for communication to user through notifications.
    public toastrService: ToastrService = inject(ToastrService)

    // Base piece of creating services, including utils endpoints, customizable rest methods and loading screen control.
    public httpUtils: HttpUtils = inject(HttpUtils)

    // Navegação programática entre rotas
    public router: Router = inject(Router)

    // Acesso à rota atual e seus parâmetros
    public activatedRoute: ActivatedRoute = inject(ActivatedRoute)

    // Controle de navegação baseado na URL do navegador
    public angularLocation: Location = inject(Location)

    // Serviço de tradução para internacionalização (i18n)
    public translateService: TranslateService = inject(TranslateService)

    // UserCache provides quick access for use in HTML, since static classes aren't accessible in Angular templates.
    public userCache: UserCache = inject(UserCache)

    // Utils provides quick access for use in HTML, since static classes aren't accessible in Angular templates.
    public readonly Utils: typeof Utils = Utils

    // GlobalsVars provides quick access for use in HTML, since static classes aren't accessible in Angular templates.
    public readonly GlobalsVars: typeof GlobalsVars = GlobalsVars
}

@Injectable({
    providedIn: 'root'
})
export abstract class Modal<T> extends BasePiece implements OnInit  {

    public useCancelConfirmation: boolean = false

    public data: T

    public dialogRef: MatDialogRef<any>

    constructor() {
        super();

        this.dialogRef = inject(MatDialogRef<any>)
        this.data = inject(MAT_DIALOG_DATA)
    }

    abstract ngOnInit(): void

    getCancelResponse(): Result {
        return new None()
    }

    async getCancelConfirmation(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Swal.fire<boolean>({
                title: 'Are you sure?',
                text: 'You cannot revert this action!',
                reverseButtons: true,
                icon: 'warning',
                iconColor: Color.YELLOW.toString(),
                confirmButtonText: 'Yes',
                showConfirmButton: true,
                confirmButtonColor: Color.HIGHLIGHT_DEFAULT.toString(),
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                cancelButtonColor: document.documentElement.style.getPropertyValue('--mid_gray_color'),

                background: document.documentElement.style.getPropertyValue('--light_gray_color'),
            }).then((result: any) => {
                resolve(result.isConfirmed);
            })
        });
    }

    @HostListener('document:keydown.escape', ['$event'])
    close(response?: Result) {
        if (!this.useCancelConfirmation) {
            this.dialogRef.close(this.getCancelResponse())
            return
        }
        this.getCancelConfirmation().then((close: boolean): void => {
            if (close) {
                this.dialogRef.close(response ?? this.getCancelResponse())
            }
        })
    }
}

@Directive()
export abstract class ModalEditor<T extends Indexable<T>> extends Modal<DataUtil<T>> {

    form: FormGroup

    isEditing: boolean = false

    object: T = this.getZeroObject()

    // Get the 'raw' form of the object
    abstract getZeroObject(): T

    constructor() {
        super();

        if(this.data && this.data.start) {
            this.object = clone(this.data.start)
            if((this.data.start instanceof IndexableID || this.data.start instanceof  IndexableUUID) && !this.data.start.id) {
                return
            }
            this.isEditing = true
        }
    }


    isValid(): boolean {
        return this.form != undefined && this.form.valid
    }

    // Converts the form to a object
    prepareToSave(): T {
        if(!this.form) {
            throw "null form object"
        }
        return this.getZeroObject().formToSelf(this.form ?? new FormGroup({}))
    }

    // Override 'beforeSave' and do whatever u want to change the object
    async beforeSave(value: T): Promise<T> {
        return value
    }

    // Close the dialog and respond object
    save(msg?: string, adds: Map<any, any> = new Map()) {
        if (!this.isValid()) {
            this.form.markAllAsTouched()
            Utils.printFirstError(this.form)
            return
        }
        if(!adds.has('edit')) {
            adds.set('edit', this.isEditing)
        }
        if(this.data && this.data.returns) {
            adds.set("returns", this.data.returns ?? new Map())
        }
        this.beforeSave(this.prepareToSave()).then((value) => {
            let final = new Some(value, msg, adds)
            this.dialogRef.close(final);
        })
    }
}
