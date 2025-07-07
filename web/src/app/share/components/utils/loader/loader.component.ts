import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    OnDestroy,
    AfterViewInit
} from "@angular/core";
import {LoaderService} from "./loader.service";
import {LoaderState} from "./loader";
import {Subscription} from "rxjs";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TranslatePipe} from "@ngx-translate/core";
import {CommonModule, NgIf} from "@angular/common";

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss'],
    imports: [
        TranslatePipe,
        MatProgressSpinner,
        MatProgressBar
    ]
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewInit {

    show = false;
    height = 0;
    loadingTopPosition = 0;

    private subscription: Subscription = new Subscription();

    @ViewChild('divContent') divContent!: ElementRef<HTMLDivElement>;

    constructor(private loaderService: LoaderService) {

    }

    ngOnInit(): void {
        this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
            console.log(state.show)
            this.show = state.show;

            this.loadingTopPosition = window.scrollY;

            if (this.divContent) {
                this.height = this.divContent.nativeElement.offsetHeight;
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.divContent) {
            this.height = this.divContent.nativeElement.offsetHeight;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}