import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {Address} from "@app/share/models/Address";
import {Observable} from "rxjs";
import {GenericResponse} from "@app/share/models/generic-response";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AddressService extends IRootService<Address> {

    getServiceUrl(): string {
        return "/address"
    }

    getCEP(cep: string): Observable<GenericResponse<Address>> {
        return this.httpService.get<GenericResponse<Address>>(`/proxy${this.getServiceUrl()}/cep/${cep}`)
            .pipe(map(response => GenericResponse.adapt(response)))
    }

    getMyAddresses(): Observable<GenericResponse<Address[]>> {
        return this.httpService.get<GenericResponse<Address[]>>(`/proxy${this.getServiceUrl()}/myAddresses`)
            .pipe(map(response => GenericResponse.adapt(response)))
    }

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    prepareSave(newObj: Address): Address {
        return newObj
    }
}
