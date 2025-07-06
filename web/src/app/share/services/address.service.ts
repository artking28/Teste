import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {Address} from "@app/share/models/Address";

@Injectable({
    providedIn: 'root'
})
export class AddressService extends IRootService<Address> {

    getServiceUrl(): string {
        return "/address"
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
