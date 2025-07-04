import {EventEmitter} from "@angular/core";


export class Signal<T = any> extends EventEmitter<T> {

    constructor(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
        super();
        super.subscribe(next, error, complete)
    }
}

