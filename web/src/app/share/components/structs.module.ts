import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
// import {LoaderService} from "@src/app/share/components/utils/loader/loader.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MaterialModule} from "@app/material.module";
import {InnerIconComponent} from "@app/share/components/utils/inner-icon/inner-icon.component";
import {SideBarComponent} from "@app/share/components/utils/side-bar/side-bar.component";
import {EntryEditorComponent} from "@app/share/components/editors/entryEditor/entryEditor.component";

const selectors: any[] = [
    // GeneralSelector
]

const editors: any[] = [
    EntryEditorComponent
]

const all: any[] = [
    ...selectors,
    ...editors,
    InnerIconComponent,
    SideBarComponent,
]

@NgModule({
    declarations: [
        ...all
    ],
    exports: [
        MaterialModule,
        ...all
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslatePipe,
        MatSlideToggle,
        FormsModule,
    ],
    providers: [
    //     {
    //     provide: LoaderService
    // }
    ],
})
export class StructsModule {
}
