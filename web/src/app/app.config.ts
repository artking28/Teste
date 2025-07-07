import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
    provideHttpClient,
    withInterceptorsFromDi
} from "@angular/common/http";
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {StructsModule} from "@app/share/components/structs.module";
import {HttpUtils} from "@app/share/founding-files/http.utils";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {UserCache} from "@app/share/cache/UserCache";
import {HttpService} from "@app/share/founding-files/http.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Interceptor} from "@app/share/interceptor";
import {LoaderService} from "@app/share/components/utils/loader/loader.service";
import {AppComponent} from "@app/root/app.component";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            BrowserModule,
            BrowserAnimationsModule,
            StructsModule,
            CommonModule,
            ToastrModule.forRoot(),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
        ),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        },
        {
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: Location,
            useValue: {}
        },
        {provide: HttpService},
        {provide: HttpUtils},
        {provide: UserCache},
        {provide: LoaderService},
        provideEnvironmentNgxMask(),
        provideAnimations(),
        provideHttpClient(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes)
    ]
};
