import {Component, OnInit} from "@angular/core";
import {BasePiece, Modal} from "@app/share/founding-files/base-piece";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@app/share/services/auth.service";
import {UserCache} from "@app/share/cache/UserCache";
import {User} from "@app/share/models/User";
import Utils from "@app/share/utils";


@Component({
    standalone: false,
    selector: 'registe-dialog',
    templateUrl: 'register-dialog.component.html',
    styleUrl: 'register-dialog.component.scss',
})
export class RegisterDialogComponent extends Modal<any> implements OnInit {

    form: FormGroup;

    constructor(private authService: AuthService) {
        super();
        this.form = new User().toFormGroup()
        this.form.addControl("password", new FormControl(null, [Validators.required, Utils.diffFields("password", "confirm")]))
        this.form.addControl("confirm", new FormControl(null, [Validators.required, Utils.diffFields("password", "confirm")]))
        this.form.removeControl("language")
    }

    ngOnInit() {
    }

    register() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            Utils.printFirstError(this.form)
            this.toastrService.warning(
                this.translateService.instant("warn.invalid.form"),
                this.translateService.instant("warn")
            );
            return
        }

        const simple = new User().formToSelf(this.form);
        this.httpUtils.httpService.showLoader()
        this.authService.signup(simple).subscribe({
            next: (res) => {
                this.httpUtils.httpService.hideLoader()
                if (res.isOk(true)) {
                    UserCache.signInCache(res.result, true)
                    this.close()
                }
            },
            error: (_) => this.httpUtils.httpService.hideLoader()
        })
    }
}
