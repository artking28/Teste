import {Component} from "@angular/core";
import {ModalEditor} from "@app/share/founding-files/base-piece";
import {Address} from "@app/share/models/Address";


@Component({
    standalone: false,
    selector: 'address-editor',
    templateUrl: 'addressEditor.component.html',
    styleUrl: 'addressEditor.component.scss',
})
export class AddressEditorComponent extends ModalEditor<Address> {

    ngOnInit(): void {
        this.object = Address.adapt(this.object)
        this.form = this.object.toFormGroup()
    }

    getZeroObject(): Address {
        return new Address();
    }
}
