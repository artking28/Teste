import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {GlobalsVars} from "@app/share/globalsVars";
import {User} from "@app/share/models/User";
import {ModalObject} from "@app/share/modal-summoner";
import {AbstractListarComponent} from "@app/share/components/utils/abstract-listar/abstract-listar.component";
import {Address} from "@app/share/models/Address";
import {AddressService} from "@app/share/services/address.service";
import {AddressEditorComponent} from "@app/share/components/editors/addressEditor/addressEditor.component";
import {StructsModule} from "@app/share/components/structs.module";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Observable} from "rxjs";
import {GenericResponse} from "@app/share/models/generic-response";


@Component({
    selector: 'addresses-component',
    templateUrl: '../../share/components/utils/abstract-listar/abstract-listar.component.html',
    styleUrls: ['users.component.scss', '../../share/components/utils/abstract-listar/abstract-listar.component.scss'],
    imports: [StructsModule, MatSortHeader, MatSort,]
})
export class AddressesComponent extends AbstractListarComponent<Address> {

    constructor(private addressService: AddressService) {//398a40
        super(Address.adapt, addressService);
        GlobalsVars.PAGE_TITLE_CONTROL.emit("my.addresses")
    }

    public override getTableColumns(): string[] {
        return ['id', 'name', 'postalCode', 'street', 'number']
    }

    public override getDefaultListObservable(): Observable<GenericResponse<Address[]>> {
        return this.addressService.getMyAddresses();
    }

    public beforeEdit(obj: Address): Address {
        return Address.adapt(obj)
    }

    override getEditModalConfig(): ModalObject {
        return new ModalObject(
            "openRoleEditorModal",
            new Map<string, any>([]),
            AddressEditorComponent,
        )
    }
}
