import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Utils from "@app/share/utils";
// import {LoaderService} from "@app/share/components/misc/loader/loader.service";
import {RequestOptions} from "@app/share/models/utility/RequestOptions";
import {UserCache} from "@app/share/cache/UserCache";
import {LoaderService} from "@app/share/components/utils/loader/loader.service";


@Injectable()
export class HttpService {

    public constructor(public httpClient: HttpClient, public loaderService: LoaderService) {

    }

    public showLoader(): void {
        this.loaderService.show();
    }

    public hideLoader(): void {
        this.loaderService.hideLoader();
    }

    /**
     * GET request
     * @param url points to the path
     * @param options customizes the request.
     */
    public get<T>(url: string, options?: RequestOptions): Observable<T> {
        return this.httpClient.get<T>(url, this.prepareOptions(options));
    }

    /**
     * POST request
     * @param url points to the path
     * @param body stands for the content of request
     * @param options customizes the request.
     */
    public post<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
        return this.httpClient.post<T>(url, body, this.prepareOptions(options));
    }

    /**
     * PATCH request
     * @param url points to the path
     * @param attributes stands for modifications to be done on certain object
     * @param options customizes the request.
     */
    public patch<T>(url: string, attributes: Map<string, any>, options?: RequestOptions): Observable<T> {
        return this.httpClient.patch<T>(url, Object.fromEntries(attributes), this.prepareOptions(options));
    }

    /**
     * PUT request
     * @param url points to the path
     * @param body stands for the content of request
     * @param options customizes the request.
     */
    public put<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
        return this.httpClient.put<T>(url, body, this.prepareOptions(options));
    }

    /**
     * DELETE request
     * @param url points to the path
     * @param options customizes the request
     */
    public delete<T>(url: string, options?: RequestOptions): Observable<T> {
        return this.httpClient.delete<T>(url, this.prepareOptions(options));
    }

    private prepareOptions(options: RequestOptions = new RequestOptions()): RequestOptions {
        let l = {
            'contentType': 'application/json',
            'timeout': `${Utils.minutes(10)}`,
        }
        if(UserCache.isUserOk()) {
            l["Authorization"] = 'Bearer ' + UserCache.getInstance()!.token;
        }
        options.headers.keys().forEach((key) => {
            l[key] = options.headers.get(key)
        })
        options.headers = new HttpHeaders(l)
        return options
    }
}
