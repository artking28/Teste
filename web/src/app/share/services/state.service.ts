import {Injectable} from "@angular/core";
import {IRootService} from "@app/share/IService.service";
import {State} from "@app/share/models/State";

@Injectable({
    providedIn: 'root'
})
export class StateService extends IRootService<State> {

    getServiceUrl(): string {
        return "/state"
    }

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    prepareSave(newObj: State): State {
        return newObj
    }
}

