import {UntypedFormGroup} from "@angular/forms";

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

