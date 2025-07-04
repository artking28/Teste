import {EventEmitter, Injectable} from "@angular/core";
import {AngularTheme} from "@app/share/models/utility/angular-theme";


@Injectable({
    providedIn: 'root',
})
export class GlobalsVars {

    public static ANGULAR_THEME_CONTROL: EventEmitter<AngularTheme> = new EventEmitter<AngularTheme>();

    public static PAGE_TITLE_CONTROL: EventEmitter<string> = new EventEmitter<string>();

    public static EMAIL_PATTERN: string = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
}
