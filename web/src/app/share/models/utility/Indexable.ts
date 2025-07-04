import {FormArray, FormGroup, UntypedFormArray} from "@angular/forms";
import {Uuid} from "@app/share/models/utility/Uuid";
import {ValidatorsMap} from "@app/share/models/utility/validation-map";

export abstract class Indexable<T extends any> {

    abstract toFormGroup(validators?: ValidatorsMap): FormGroup

    abstract formToSelf(form: FormGroup): T

    abstract isValidID(): boolean

    abstract getId(): any

    // Null the 'id' without using the 'null' since it isn't allowed.
    abstract nullify(): void
}

export abstract class IndexableID<T extends any> extends Indexable<T> {

    public id: number

    public abstract override toFormGroup(validators?: ValidatorsMap): FormGroup

    public abstract override formToSelf(form: FormGroup): T

    public isValidID(): boolean {
        return this.id != null && this.id > 0
    }

    // Null the 'id' without using the 'null' since it isn't allowed.
    public nullify() {
        this.id = NaN
    }

    public getId(): number {
        return this.id
    }
}


export abstract class IndexableUUID<T extends any> extends Indexable<T> {

    id: string = new Uuid().toString()

    public abstract override toFormGroup(validators?: ValidatorsMap): FormGroup

    public abstract override formToSelf(form: FormGroup): T

    public isValidID(): boolean {
        return this.id != null && Uuid.isOk(this.id)
    }

    // Null the 'id' without using the 'null' since it isn't allowed.-
    public nullify() {
        this.id = ""
    }

    public getId(): string {
        return this.id
    }
}

export function formObject<T extends Indexable<any>>(object: T, validators?: ValidatorsMap): FormGroup {
    if (!object) {
        return new FormGroup({})
    }
    return object.toFormGroup(validators)
}

export function formArray<T extends Indexable<any>>(vec: T[], validators?: ValidatorsMap): FormArray {
    if (vec && vec.length > 0) {
        let formArray: FormGroup[] = vec.map((object: T) => object.toFormGroup(validators))
        return new FormArray(formArray)
    }
    return new UntypedFormArray([])
}
