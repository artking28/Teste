import {FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Indexable} from "@app/share/models/utility/Indexable";
import {CurrencyValue} from "@app/share/models/CurrencyValue";

export class Currency extends Indexable<Currency> {
    id   :number
    name :string

    // One-to-Many
    currencyValues :CurrencyValue[]

    isIdNull(): boolean {
        return this.id != undefined && this.id > 0;
    }

    public static adapt(object: Currency): Currency {
        let ret = Object.assign(new Currency(), object)
        if (object.currencyValues && object.currencyValues.length > 0) {
            ret.currencyValues = object.currencyValues.map((s) => CurrencyValue.adapt(s))
        }
        return ret;
    }

    toFormGroup(validators?: Map<string, ValidatorFn[]>): FormGroup {
        if (!validators) {
            validators = new Map<string, ValidatorFn[]>()
        }
        return new FormGroup({
            id: new FormControl(this.id),
            name: new FormControl(this.name),
            currencyValues: Indexable.formArray(this.currencyValues),
        });
    }

    public formToSelf(form: FormGroup): Currency {
        let ret = form.getRawValue();
        return Currency.adapt(ret)
    }
}
