import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Indexable} from "@app/share/models/utility/Indexable";
import {Portion} from "@app/share/models/Portion";
import {Entry} from "@app/share/models/Entry";

export class PaymentGroup extends Indexable<PaymentGroup> {
    id      :number
    uuid    :string
    entryId :number
    value   :number
    count   :number
    credit  :boolean

    // Many-to-One
    entry :Entry

    // One-to-Many
	portions :Portion[]

    isIdNull(): boolean {
        return this.id != undefined && this.id > 0;
    }

    public static adapt(object: PaymentGroup): PaymentGroup {
        let ret = Object.assign(new PaymentGroup(), object)
        if (object.entry) {
            ret.entry = Entry.adapt(object.entry)
        }
        if (object.portions && object.portions.length > 0) {
            ret.portions = object.portions.map((s) => Portion.adapt(s))
        }
        return ret;
    }

    toFormGroup(validators?: Map<string, ValidatorFn[]>): FormGroup {
        if (!validators) {
            validators = new Map<string, ValidatorFn[]>()
        }
        return new FormGroup({
            id: new FormControl(this.id),
            uuid: new FormControl(this.uuid),
            entryId: new FormControl(this.entryId),
            value: new FormControl(this.value),
            count: new FormControl(this.count),
            credit: new FormControl(this.credit),
            portions: Indexable.formArray(this.portions),
            entry: Indexable.formObject(this.entry),
        });
    }

    public formToSelf(form: FormGroup): PaymentGroup {
        let ret = form.getRawValue();
        return PaymentGroup.adapt(ret)
    }
}
