import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Indexable} from "@app/share/models/utility/Indexable";
import {PaymentGroup} from "@app/share/models/PaymentGroup";

export class Portion extends Indexable<Portion> {
    id          :number
    uuid        :string
    tags        :string
    expense     :boolean
    currencyId  :number
    createdAt   :Date
    description :string

    // One-to-Many
    paymentGroups :PaymentGroup[]

    isIdNull(): boolean {
        return this.id != undefined && this.id > 0;
    }

    public static adapt(object: Portion): Portion {
        let ret = Object.assign(new Portion(), object)
        if (object.paymentGroups && object.paymentGroups.length > 0) {
            ret.paymentGroups = object.paymentGroups.map((s) => PaymentGroup.adapt(s))
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
            tags: new FormControl(this.tags),
            expense: new FormControl(this.expense),
            currencyId: new FormControl(this.currencyId),
            createdAt: new FormControl(this.createdAt),
            description: new FormControl(this.description),
            paymentGroups: Indexable.formArray(this.paymentGroups),
        });
    }

    public formToSelf(form: FormGroup): Portion {
        let ret = form.getRawValue();
        return Portion.adapt(ret)
    }
}
