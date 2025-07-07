import {Injectable} from '@angular/core';
import {LoaderState} from './loader';
import {Subject} from "rxjs";

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    quantidadeLoadings: number = 0;

    constructor() {}

    show() {
        this.quantidadeLoadings++;

        setTimeout(() => {
            this.loaderSubject.next(<LoaderState>{show: true});
        }, 50);
    }

    hideLoader() {
        this.quantidadeLoadings--;

        if (this.quantidadeLoadings <= 0) {
            this.quantidadeLoadings = 0;

            setTimeout(() => {
                this.loaderSubject.next(<LoaderState>{show: false});
            }, 50);
        }
    }
}
