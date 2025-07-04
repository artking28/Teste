import {Component, HostBinding} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalSummoner} from "@app/share/modal-summoner";
import {StructsModule} from "@app/share/components/structs.module";
import {RouterOutlet} from "@angular/router";
import {GlobalsVars} from "@app/share/globalsVars";
import {TranslatePipe} from "@ngx-translate/core";
import {OverlayContainer} from "@angular/cdk/overlay";
import {AngularTheme} from "@app/share/models/utility/angular-theme";
import Utils from "@app/share/utils";
import {CSS_Support} from "@app/share/models/utility/Color";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        StructsModule,
        RouterOutlet,
        TranslatePipe
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent {

    @HostBinding('class')
    activeThemeCssClass: AngularTheme = 'angular-light'

    title: string = '';

    constructor(private overlayContainer: OverlayContainer,
                private dialog: MatDialog) {

        GlobalsVars.PAGE_TITLE_CONTROL.subscribe((title: string): void => {
            this.title = title
        });

        // Define a listener to allow angular theme changes
        // #################################################################################################
        GlobalsVars.ANGULAR_THEME_CONTROL.subscribe((theme: AngularTheme): void => {
            const classList = this.overlayContainer.getContainerElement().classList
            if (classList.contains(this.activeThemeCssClass)) {
                classList.replace(this.activeThemeCssClass, theme)
            } else {
                classList.add(theme)
            }
            this.activeThemeCssClass = theme
            CSS_Support.defTheme(theme)
        })

        // Define a listener to browser theme changes, if user is null, match browser theme
        // #################################################################################################
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (_) => {
            const theme: AngularTheme = Utils.isBrowserThemeDark() ? 'angular-dark' : 'angular-light'
            GlobalsVars.ANGULAR_THEME_CONTROL.emit(theme)
        });

        // Ensure the web page will always render with no scroll
        // #################################################################################################
        window.scrollBy(0, -Math.max(...[document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight]));

        // Define initial theme
        // #################################################################################################
        GlobalsVars.ANGULAR_THEME_CONTROL.emit('angular-light')

        // Initializes the static class 'ModalSummoner'
        // #################################################################################################
        ModalSummoner.init(this.dialog)
    }

    swipTheme() {
        const novo = (this.activeThemeCssClass == 'angular-light') ? 'angular-dark' : 'angular-light'
        GlobalsVars.ANGULAR_THEME_CONTROL.emit(novo)
    }
}
