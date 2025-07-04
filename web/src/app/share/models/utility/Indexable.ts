import {FormArray, FormGroup, UntypedFormArray, ValidatorFn} from "@angular/forms";

export abstract class Indexable<T extends any> {

    public abstract isIdNull(): boolean

    public abstract toFormGroup(validators?: Map<string, ValidatorFn[]>): FormGroup

    public abstract formToSelf(form: FormGroup): T

    public static formObject<T extends Indexable<any>>(object: T): FormGroup {
        if (!object) {
            return new FormGroup({})
        }
        return object.toFormGroup()
    }

    public static formArray<T extends Indexable<any>>(vec: T[]): FormArray {
        if (vec && vec.length > 0) {
            let formArray: FormGroup[] = vec.map((object: T) => object.toFormGroup())
            return new FormArray(formArray)
        }
        return new UntypedFormArray([])
    }
}
