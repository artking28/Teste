import {HttpHeaders, HttpParams} from "@angular/common/http";

export class RequestOptions {
    headers: HttpHeaders = new HttpHeaders()
    params: HttpParams = new HttpParams()
    withCredentials: boolean = true;

    constructor(withCredentials: boolean = true) {
        this.withCredentials = withCredentials
    }
}
