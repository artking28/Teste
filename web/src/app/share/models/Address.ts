import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Indexable, IndexableID} from "@app/share/models/utility/Indexable";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";


export class Address extends IndexableID<Address> {
    name: string = ""
    number: number
    addition: string = ""
    street: string = ""
    district: string = ""
    postalCode: string = ""

    public static adapt(object: Address): Address {
        return Object.assign(new Address(), object);
    }

    public formToSelf(form: FormGroup): Address {
        return Address.adapt(form.getRawValue())
    }

    toFormGroup(validators?: ValidatorsMap): FormGroup {
        if (!validators) {
            validators = new ValidatorsMap()
        }
        return new FormGroup({
            id: new FormControl(this.id, validators.fields.get("id")),
            name: new FormControl(this.name, validators.fields.get("name") ?? []),
            number: new FormControl(this.number, validators.fields.get("number") ?? [Validators.required]),
            addition: new FormControl(this.addition, validators.fields.get("addition") ?? []),
            street: new FormControl(this.street, validators.fields.get("street") ?? [Validators.required]),
            district: new FormControl(this.district, validators.fields.get("district") ?? [Validators.required]),
            postalCode: new FormControl(this.postalCode, validators.fields.get("postalCode") ?? [Validators.required]),
        });
    }
}
