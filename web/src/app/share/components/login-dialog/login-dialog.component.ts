import {Component, OnInit} from "@angular/core";
import {Modal} from "@app/share/founding-files/base-piece";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@app/share/services/auth.service";
import {UserCache} from "@app/share/cache/UserCache";


@Component({
    standalone: false,
    selector: 'login-dialog',
    templateUrl: 'login-dialog.component.html',
    styleUrl: 'login-dialog.component.scss',
})
export class LoginDialogComponent extends Modal<any> implements OnInit {

    form: FormGroup;

    constructor(private authService: AuthService) {
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
            this.toastrService.warning(
                this.translateService.instant("warn.invalid.form"),
                this.translateService.instant("warn")
            );
            return
        }

        const simple = this.form.getRawValue();
        this.httpUtils.httpService.showLoader()
        this.authService.login(simple.nickname, simple.password).subscribe({
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
