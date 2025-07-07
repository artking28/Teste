import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";
import {formObject, IndexableID} from "@app/share/models/utility/Indexable";
import {State} from "@app/share/models/State";

export class City extends IndexableID<City> {
    public name: string;
    public codigoIBGE: string;
    public state: State;

    public static adapt(object: City): City {
        let ret = Object.assign(new City(), object)
        if (object.state) {
            ret.state = State.adapt(object.state)
        }
        return ret
    }

    public formToSelf(form: FormGroup): City {
        return City.adapt(form.getRawValue())
    }

    toFormGroup(validators?: ValidatorsMap): FormGroup {
        if (!validators) {
            validators = new ValidatorsMap()
        }
        return new FormGroup({
            id: new FormControl(this.id, validators.fields.get("id")),
            name: new FormControl(this.name, validators.fields.get("name") ?? [Validators.required]),
            state: formObject(this.state, validators.objects?.get("state"))
        });
    }
}
