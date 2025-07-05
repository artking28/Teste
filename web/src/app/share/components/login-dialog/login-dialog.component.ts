import {Component, OnInit} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
    standalone: false,
    selector: 'login-dialog',
    templateUrl: 'login-dialog.component.html',
    styleUrl: 'login-dialog.component.scss',
})
export class LoginDialogComponent extends BasePiece implements OnInit {

    form: FormGroup;

    constructor() {
        super();
        this.form = new FormGroup({
            nickname: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit() {
    }

    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            this.toastrService.warning("warn.invalid.form", "Warn");
            return
        }
    }
}
