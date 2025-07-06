import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {City} from "@app/share/models/City";

@Injectable({
    providedIn: 'root'
})
export class CityService extends IRootService<City> {

    getServiceUrl(): string {
        return "/city"
    }

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    prepareSave(newObj: City): City {
        return newObj
    }
}
