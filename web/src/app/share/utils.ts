import {AbstractControl, FormArray, FormGroup, UntypedFormGroup, ValidatorFn} from "@angular/forms";
import Swal from "sweetalert2";
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";
import {GlobalsVars} from "@app/share/globalsVars";
import {Color} from "@app/share/models/utility/Color";
import {ToastrService} from "ngx-toastr";

export default class Utils {

    public static minutes(n: number) {
        return n * this.seconds(60)
    }

    public static seconds(n: number) {
        return n * 1000
    }

    static pad(value: any) {
        return value.toString().padStart(2, '0');
    }

    public static call(f: undefined | (() => void)) {
        if (f) f()
    }

    public static upperCaseFirst(value: string) {
        return value.substring(0, 1).toUpperCase() + value.substring(1);
    }

    static showMessages(messages: Array<any>[], toastrService: ToastrService): void {
        let varMensagem: any;
        if (!messages || messages.length <= 0) {
            return
        }

        toastrService.clear();
        for (varMensagem of messages) {

            let timeout: number = Utils.minutes(5);
            if (varMensagem.timeout && varMensagem.timeout > 0) {
                timeout = varMensagem.timeout
            }

            //console.log(varMensagem)

            switch (varMensagem.type) {
                case "TYPE_INFORMATION": // Erro
                    toastrService.info("", varMensagem.message, {
                        timeOut: timeout,
                    });
                    break;
                case "TYPE_QUEST": // Sucesso
                    toastrService.success("", varMensagem.message, {
                        timeOut: timeout,
                    });
                    break;
                case "TYPE_WARN": // Alerta
                    toastrService.info("", varMensagem.message, {
                        timeOut: timeout,
                    });
                    break;
                case "TYPE_ERROR":
                    toastrService.error(varMensagem.message, "", {
                        timeOut: timeout,
                    });
            }
        }
    }

    public static getFieldError(form: FormGroup, translate: TranslateService, fieldName: string): string | null {
        if (!form) {
            return null
        }

        const control: AbstractControl | null = form.get(fieldName);
        if (!control || !control.touched || !control.errors) return null

        const errorKeys = Object.keys(control.errors);
        if (errorKeys.length === 0) return null;

        const firstError = errorKeys[0];

        switch (firstError) {
            case 'required':
            case 'pattern':
            case 'minlength':
            case 'maxlength':
            case 'email':
            case 'min':
            case 'max':
            case 'diffFields':
                return translate.instant(`field.error.${firstError}`);
            default:
                return firstError;
        }
    }

    static printFirstError(control: AbstractControl, path: string = ''): boolean {
        if (control.errors) {
            console.log(`Erro em "${path}":`, control.errors);
            return true;
        }

        if (control instanceof FormGroup) {
            for (const key of Object.keys(control.controls)) {
                const found = Utils.printFirstError(control.controls[key], path ? `${path}.${key}` : key);
                if (found) return true;
            }
        }

        if (control instanceof FormArray) {
            for (let i = 0; i < control.controls.length; i++) {
                const found = Utils.printFirstError(control.controls[i], `${path}[${i}]`);
                if (found) return true;
            }
        }

        return false;
    }

    public static diffFields(field1: string, field2: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {

            const controls = control?.parent?.controls as { [key: string]: AbstractControl };
            if (!controls?.[field1]?.value || !controls?.[field2]?.value) {
                return null;
            }

            controls[field1].markAsTouched();
            controls[field2].markAsTouched();

            const diff: boolean = controls[field1].value !== controls[field2].value
            return diff ? {diffFields: true} : null;
        }
    }

    public static async bulkTranslate(words: string[], translateService: TranslateService): Promise<Map<string, string>> {
        const ret = new Map<string, string>()
        for (const word of words) {
            await firstValueFrom(translateService.get(word))
                .then((translated) => {
                    ret.set(word, translated)
                })
                .catch((_) => {
                    ret.set(word, word)
                })
        }
        return ret
    }

    static async callConfirm(customText?: string): Promise<boolean> {
        const result = await Swal.fire<boolean>({
            title: GlobalsVars.SWAL_COFIRM_LABELS.get("areYouSure"),
            text: customText ? customText : GlobalsVars.SWAL_COFIRM_LABELS.get("youCannotRevertThisAction"),
            icon: 'warning',
            iconColor: Color.YELLOW.toString(),
            reverseButtons: true,
            showConfirmButton: true,
            confirmButtonText: GlobalsVars.SWAL_COFIRM_LABELS.get("yes"),
            showCancelButton: true,
            cancelButtonText: GlobalsVars.SWAL_COFIRM_LABELS.get("cancel"),
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            },
            background: Color.WHITE.toString(),
        })
        return result.isConfirmed
    }

    static inspectFormErrors(form: UntypedFormGroup) {
        Object.keys(form.controls).forEach(nome => {
            if (form.controls[nome].errors) {
                console.log(nome, form.controls[nome].errors);
            }
        });
    }

    public static isBrowserThemeDark(): boolean {
        let theme = window.matchMedia('(prefers-color-scheme: dark)')
        if (theme && theme.media) {
            return theme.matches
        }
        return false
    }
}

