import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {clone} from "underscore";
import {Indexable} from "@app/share/models/utility/Indexable";
import {RequestOptions} from "@app/share/models/utility/RequestOptions";
import {HttpClient} from "@angular/common/http";
import {Response} from "@app/share/models/utility/Response";
import {HttpService} from "@app/share/founding-files/http.service";

@Injectable({
    providedIn: 'root'
})
export abstract class Service {

    // Base piece of creating services, including utils endpoints, customizable rest methods and loading screen control.
    public httpService: HttpService = inject(HttpService)

    abstract getServiceUrl(): string;

    ping(path: string): Observable<Response<boolean>> {
        let obs: Observable<Response> = this.httpService.get<Response<boolean>>(`/proxy${path}/ping`, new RequestOptions(false))
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }
}

@Injectable({
    providedIn: 'root'
})
export abstract class IRootService<T extends Indexable<T>> extends Service {

    abstract prepareSave(newObj: T): void | T;

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    ping(): Observable<Response<boolean>> {
        return super.ping(this.getServiceUrl())
    }

    getById(id: string): Observable<Response<T>> {
        let pub: string = this.isGetByIdPublic() ? "/api" : ""
        let obs: Observable<Response> = this.httpService.get<Response<T>>(`/proxy${this.getServiceUrl() + pub}/byId/${id}`);
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }

    list(/*fltr: FilterObject<T> | null*/): Observable<Response<T[]>> {
        let pub: string = this.isListPublic() ? "/api" : ""
        let obs: Observable<Response> = this.httpService.post<Response>('/proxy' + this.getServiceUrl() + pub + '/select', null)
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }

    getFirst(/*fltr: FilterObject<T> | null*/): Observable<Response<T>> {
        return this.list(/*fltr*/).pipe(map((data: Response<T[]>): Response<T> => {
            let res = Response.adapt<T[]>(data)
            let newRes = new Response<T>()
            newRes.messages = res.messages
            newRes.responseCode = res.responseCode
            // newRes.paginator = res.paginator
            newRes.language = res.language
            if(res && res.result && res.result.length > 0) {
                newRes.result = res.result[0]
            }
            return newRes
        }))
    }

    save(newObj: T): Observable<Response> {
        let one = clone(newObj)
        this.prepareSave(one)
        let obs: Observable<Response> = this.httpService.post<Response>("/proxy" + this.getServiceUrl() + '/', one);
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }

    patch(id: number | string, params: Map<string, any>): Observable<Response> {
        let obs: Observable<Response> = this.httpService.patch<Response>("/proxy" + this.getServiceUrl() + '/byId/' + id, params);
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }

    deleteById(id: string | number): Observable<Response> {
        let obs: Observable<Response> = this.httpService.delete<Response>("/proxy" + this.getServiceUrl() + '/byId/' + id);
        return obs.pipe(map((data) =>
            Response.adapt(data)
        ))
    }
}
