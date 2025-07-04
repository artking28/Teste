import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Indexable} from "@app/share/models/utility/Indexable";
import {Currency} from "@app/share/models/Currency";

export class CurrencyValue extends Indexable<CurrencyValue> {
    id         :number
    when       :Date
    value      :number
    currencyId :number

    // One-to-Many
    currency :Currency

    isIdNull(): boolean {
        return this.id != undefined && this.id > 0;
    }

    public static adapt(object: CurrencyValue): CurrencyValue {
        let ret = Object.assign(new CurrencyValue(), object)
        if (object.currency) {
            ret.currency = Currency.adapt(object.currency)
        }
        return ret;
    }

    toFormGroup(validators?: Map<string, ValidatorFn[]>): FormGroup {
        if (!validators) {
            validators = new Map<string, ValidatorFn[]>()
        }
        return new FormGroup({
            id: new FormControl(this.id),
            when: new FormControl(this.when),
            value: new FormControl(this.value),
            currencyId: new FormControl(this.currencyId),
            currency: Indexable.formObject(this.currency),
        });
    }

    public formToSelf(form: FormGroup): CurrencyValue {
        let ret = form.getRawValue();
        return CurrencyValue.adapt(ret)
    }
}
