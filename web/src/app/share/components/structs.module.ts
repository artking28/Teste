import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MaterialModule} from "@app/material.module";
import {InnerIconComponent} from "@app/share/components/utils/inner-icon/inner-icon.component";
import {SideBarComponent} from "@app/share/components/utils/side-bar/side-bar.component";
import {UserEditorComponent} from "@app/share/components/editors/userEditor/userEditor.component";
import {LoginDialogComponent} from "@app/share/components/login-dialog/login-dialog.component";

const selectors: any[] = [
    // GeneralSelector
]

const editors: any[] = [
    UserEditorComponent
]

const all: any[] = [
    ...selectors,
    ...editors,
    InnerIconComponent,
    LoginDialogComponent,
    SideBarComponent,
]

@NgModule({
    declarations: [
        ...all
    ],
    exports: [
        ...all,
        MaterialModule,
        TranslatePipe,
        CommonModule,
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
