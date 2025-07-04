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
    LIGHT_BACKGROUND = "#eeeeee",
    DARK_BACKGROUND = "#0a0a0a",
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

        let col = (theme == "angular-dark" ? Color.DARK_BACKGROUND.toString() : Color.LIGHT_BACKGROUND.toString())
        document.documentElement.style.setProperty('--opaque_005_color', `${col}0a`);
        document.documentElement.style.setProperty('--opaque_010_color', `${col}19`);
        document.documentElement.style.setProperty('--opaque_020_color', `${col}33`);
        document.documentElement.style.setProperty('--opaque_030_color', `${col}4c`);
        document.documentElement.style.setProperty('--opaque_040_color', `${col}66`);
        document.documentElement.style.setProperty('--opaque_050_color', `${col}7f`);
        document.documentElement.style.setProperty('--opaque_060_color', `${col}99`);
        document.documentElement.style.setProperty('--opaque_070_color', `${col}b2`);
        document.documentElement.style.setProperty('--opaque_080_color', `${col}cc`);
        document.documentElement.style.setProperty('--opaque_090_color', `${col}e5`);
    }

    public static defColors() {
        document.documentElement.style.setProperty('--success_color', Color.GREEN.toString());
        document.documentElement.style.setProperty('--warning_color', Color.YELLOW.toString());
        document.documentElement.style.setProperty('--error_color', Color.RED.toString());
        document.documentElement.style.setProperty('--info_color', Color.BLUE.toString());

        const highlight = Color.HIGHLIGHT_DEFAULT.toString()
        document.documentElement.style.setProperty('--highlight-010', `${highlight}19`);
        document.documentElement.style.setProperty('--highlight-020', `${highlight}33`);
        document.documentElement.style.setProperty('--highlight-030', `${highlight}4c`);
        document.documentElement.style.setProperty('--highlight-040', `${highlight}66`);
        document.documentElement.style.setProperty('--highlight-050', `${highlight}7f`);
        document.documentElement.style.setProperty('--highlight-060', `${highlight}99`);
        document.documentElement.style.setProperty('--highlight-070', `${highlight}b2`);
        document.documentElement.style.setProperty('--highlight-080', `${highlight}cc`);
        document.documentElement.style.setProperty('--highlight-090', `${highlight}e5`);
        document.documentElement.style.setProperty('--highlight-100', `${highlight}ff`);
        document.documentElement.style.setProperty('--highlight', highlight);
    }
}

