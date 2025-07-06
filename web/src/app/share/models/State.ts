import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";
import {IndexableID} from "@app/share/models/utility/Indexable";
import {City} from "@app/share/models/City";

export class State extends IndexableID<State> {
    public name: string;
    public acronym: string;
    public cities: City[] = [];

    public static adapt(object: State): State {
        let ret = Object.assign(new State(), object)
        if (object.cities && object.cities.length > 0) {
            ret.cities = object.cities.map((r) => City.adapt(r))
        }
        return ret
    }

    public formToSelf(form: FormGroup): State {
        return State.adapt(form.getRawValue())
    }

    toFormGroup(validators?: ValidatorsMap): FormGroup {
        if (!validators) {
            validators = new ValidatorsMap()
        }
        return new FormGroup({
            id: new FormControl(this.id, validators.fields.get("id")),
            name: new FormControl(this.name, validators.fields.get("name") ?? [Validators.required]),
            acronym: new FormControl(this.acronym, validators.fields.get("acronym") ?? [Validators.required]),
        });
    }
}
