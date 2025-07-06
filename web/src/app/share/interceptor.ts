import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {firstValueFrom, Observable, tap, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {Injectable, Injector} from "@angular/core";
import Utils from "@app/share/utils";
import {ModalSummoner} from "@app/share/modal-summoner";
import {UserCache} from "@app/share/cache/UserCache";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    private get translateService(): TranslateService {
        return this.injector.get(TranslateService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap({
            next: event => {
                if (event instanceof HttpResponse && event.body && event.body.messages) {
                    Utils.showMessages(event.body.messages, this.toastrService);
                }
            }, error: async error => {

                // Check if it is recognizable
                let ok: boolean = error instanceof HttpErrorResponse
                if (!ok) {
                    console.log("Unknown error object [from: Interceptor]", error)
                    return;
                }

                // Get the error default title
                let title: string = "Error"
                await firstValueFrom(this.translateService.get("error")).then((translatedTitle: string) => {
                    title = translatedTitle
                });

                // Handle error by status
                switch (error.status) {
                    case 400:
                        console.log(error);
                        this.toastrService.clear();
                        this.translateService.get("error.invalid.request").subscribe((translatedMessage: string) => {
                            this.toastrService.clear();
                            this.toastrService.error(translatedMessage, title);
                        });
                        break;
                    case 401:
                    case 403:
                        if (!req.url.endsWith("/api/auth/signUp") && !req.url.endsWith("/login")) {
                            UserCache.signOutCache()
                            return
                        }
                        Utils.showMessages(error.error.messages, this.toastrService);
                        break;
                    case 409:
                        this.toastrService.clear();
                        Utils.showMessages(error.error.messages, this.toastrService);
                        break;
                    case 500:
                        this.toastrService.clear();
                        Utils.showMessages(error.error.messages, this.toastrService);
                        break;
                    case 503:
                        this.toastrService.clear();
                        this.translateService.get("error.checkConnection").subscribe((translatedMessage: string) => {
                            this.toastrService.clear();
                            this.toastrService.error(translatedMessage, title);
                        });
                        break;
                    case 504:
                        this.toastrService.clear();
                        this.translateService.get("error.noServerResponse").subscribe((translatedMessage: string) => {
                            this.toastrService.clear();
                            this.toastrService.error(translatedMessage, title);
                        });
                        break;
                    default:
                        if (error.message && error.message.indexOf("Timeout") >= 0) {
                            this.translateService.get("error.lazy.connection").subscribe((translatedMessage: string) => {
                                this.toastrService.clear();
                                this.toastrService.error(translatedMessage, title);
                            });
                        } else {
                            console.log('Erro desconhecido: ' + error);
                        }
                        break;
                }

                return throwError(() => error);
            }
        }))
    };
}
