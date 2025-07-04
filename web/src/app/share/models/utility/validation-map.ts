import {ValidatorFn} from "@angular/forms";

export class ValidatorsMap {
    fields: Map<string, ValidatorFn[]>
    objects: Map<string, ValidatorsMap>

    constructor(validators: Map<string, ValidatorFn[]> = new Map<string, ValidatorFn[]>(), subs?: Map<string, ValidatorsMap>) {
        this.fields = validators;
        if(subs) {
            this.objects = subs;
        }
    }
}
