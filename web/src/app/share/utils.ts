import {UntypedFormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";
import {GlobalsVars} from "@app/share/globalsVars";
import {Color} from "@app/share/models/utility/Color";

export default class Utils {

    public static minutes(n: number) {
        return n*this.seconds(60)
    }

    public static seconds(n: number) {
        return n*1000
    }

    static pad(value: any) {
        return value.toString().padStart(2, '0');
    }

    public static call(f: undefined | (() => void)) {
        if(f) f()
    }

    public static upperCaseFirst(value: string) {
        return value.substring(0, 1).toUpperCase() + value.substring(1);
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

