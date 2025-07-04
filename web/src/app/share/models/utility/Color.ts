import {Injectable} from "@angular/core";
import {AngularTheme} from "@app/share/models/utility/angular-theme";

export const enum Color {

    // Basic colors
    WHITE = "#ffffff",
    PURPLE = "#9e73e7",
    RED = "#c54e66",
    ORANGE = "#d08770",
    YELLOW = "#ecca71",
    GREEN = "#85c69a",
    LIGHT_BLUE = "#76a4e8",
    BLUE = "#30507e",
    BLACK = "#000000",

    LIGHT_GRAY = "#e6e6e6",
    MID_GRAY = "#616061",
    DARK_GRAY = "#393839",
    ALMOST_BLACK = "#101010",

    // Cor da marca
    HIGHLIGHT_DEFAULT = "#950a46",

    // Logo color
    DARK_LOGO_COLOR = "#ffa0c6",
    LIGHT_LOGO_COLOR = "#950a46",

    // Font colors
    DARK_FONT = "#dddddd",
    LIGHT_FONT = "#353535",

    // Lines color
    DARK_LINES = "#232323",
    LIGHT_LINES = "#8a8a8a",

    // Backgrounds colors
    DARK_BACKGROUND = "#0a0a0a",
    LIGHT_BACKGROUND = "#eeeeee",
}

@Injectable({
    providedIn: 'root'
})
export class CSS_Support {

    public static defTheme(theme: AngularTheme) {
        if (theme == "angular-dark") {
            document.documentElement.style.setProperty('--lines', Color.DARK_LINES.toString());
            document.documentElement.style.setProperty('--font_color', Color.DARK_FONT.toString());
            document.documentElement.style.setProperty('--background', Color.DARK_BACKGROUND.toString());
            document.documentElement.style.setProperty('--logo_color', Color.DARK_LOGO_COLOR.toString());
        } else {
            document.documentElement.style.setProperty('--lines', Color.LIGHT_LINES.toString());
            document.documentElement.style.setProperty('--font_color', Color.LIGHT_FONT.toString());
            document.documentElement.style.setProperty('--background', Color.LIGHT_BACKGROUND.toString());
            document.documentElement.style.setProperty('--logo_color', Color.LIGHT_LOGO_COLOR.toString());
        }

        let color: string = (theme != "angular-dark" ? Color.DARK_BACKGROUND.toString() : Color.LIGHT_BACKGROUND.toString())
        document.documentElement.style.setProperty('--opaque-010_color', `${color}0a`);
        document.documentElement.style.setProperty('--opaque-020_color', `${color}19`);
        document.documentElement.style.setProperty('--opaque-030_color', `${color}33`);
        document.documentElement.style.setProperty('--opaque-040_color', `${color}4c`);
        document.documentElement.style.setProperty('--opaque-050_color', `${color}66`);
        document.documentElement.style.setProperty('--opaque-060_color', `${color}7f`);
        document.documentElement.style.setProperty('--opaque-070_color', `${color}99`);
        document.documentElement.style.setProperty('--opaque-080_color', `${color}b2`);
        document.documentElement.style.setProperty('--opaque-090_color', `${color}cc`);
    }
}

