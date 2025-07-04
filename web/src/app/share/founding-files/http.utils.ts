import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RequestOptions} from "@app/share/models/utility/RequestOptions";
import {ViaCepAddress} from "@app/share/models/utility/via-cep-address";
import {HttpService} from "@app/share/founding-files/http.service";


@Injectable()
export class HttpUtils {

    public httpService: HttpService = inject(HttpService)

    getViaCEP(cep: string): Observable<ViaCepAddress> {
        return this.httpService.get(`/proxy/viaCep/${cep.replace("-", "")}/json/`, new RequestOptions(false))
    }
}
