import {ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalSummoner} from "@app/share/modal-summoner";
import {StructsModule} from "@app/share/components/structs.module";
import {RouterOutlet} from "@angular/router";
import {GlobalsVars} from "@app/share/globalsVars";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {OverlayContainer} from "@angular/cdk/overlay";
import {AngularTheme} from "@app/share/models/utility/angular-theme";
import Utils from "@app/share/utils";
import {CSS_Support} from "@app/share/models/utility/Color";
import {User} from "@app/share/models/User";
import {UserCache} from "@app/share/cache/UserCache";
import {LoaderComponent} from "@app/share/components/utils/loader/loader.component";
import {UserService} from "@app/share/services/user.service";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        StructsModule,
        RouterOutlet,
        TranslatePipe,
        LoaderComponent
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent {

    @HostBinding('class')
    activeThemeCssClass: AngularTheme = 'angular-light'

    title: string = '';

    constructor(private overlayContainer: OverlayContainer,
                private dialog: MatDialog,
                private userService: UserService,
                private translateService: TranslateService) {


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

        const browserLang = this.translateService.getBrowserLang();
        if (browserLang) {
            this.translateService.setDefaultLang(browserLang);
        } else {
            this.translateService.setDefaultLang("pt");
        }

        // Define a listener to browser theme changes, if user is null, match browser theme
        // #################################################################################################
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (_) => {
            if (!UserCache.getInstance().ok) {
                GlobalsVars.ANGULAR_THEME_CONTROL.emit(Utils.isBrowserThemeDark() ? 'angular-dark' : 'angular-light')
            }
        });

        // Ensure the web page will always render with no scroll
        // #################################################################################################
        window.scrollBy(0, -Math.max(...[document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight]));

        // Define initial theme
        // #################################################################################################
        const cache = UserCache.getInstance()
        const theme = Utils.isBrowserThemeDark() ? 'angular-dark' : 'angular-light'
        GlobalsVars.ANGULAR_THEME_CONTROL.emit(cache == undefined ? theme : cache.dark ? 'angular-dark' : 'angular-light')

        // Initializes the static class 'ModalSummoner'
        // #################################################################################################
        ModalSummoner.init(this.dialog)
    }

    swipTheme() {
        this.userService.changeTheme().subscribe({
            next: (res) => {
                this.userService.httpService.hideLoader()
                if (res.isOk(false)) {
                    UserCache.changeTheme()
                    const novo = (this.activeThemeCssClass == 'angular-light') ? 'angular-dark' : 'angular-light'
                    GlobalsVars.ANGULAR_THEME_CONTROL.emit(novo)
                }
            },
            error: _ => this.userService.httpService.hideLoader()
        })
    }

    protected readonly UserCache = UserCache;
}
