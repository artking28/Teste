import {IRootService} from "@app/share/IService.service";
import {Injectable} from "@angular/core";
import {Entry} from "@app/share/models/Entry";

@Injectable({
    providedIn: 'root'
})
export class EntryService extends IRootService<Entry> {

    getServiceUrl(): string {
        return "/entry"
    }

    isGetByIdPublic(): boolean {
        return false
    }

    isListPublic(): boolean {
        return false
    }

    prepareSave(newObj: Entry): Entry {
        return newObj
    }
}
