import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslatePipe} from "@ngx-translate/core";
import {MaterialModule} from "@app/material.module";
import {InnerIconComponent} from "@app/share/components/utils/inner-icon/inner-icon.component";
import {SideBarComponent} from "@app/share/components/utils/side-bar/side-bar.component";
import {UserEditorComponent} from "@app/share/components/editors/userEditor/userEditor.component";
import {LoginDialogComponent} from "@app/share/components/login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "@app/share/components/register-dialog/register-dialog.component";
import {AddressEditorComponent} from "@app/share/components/editors/addressEditor/addressEditor.component";
import {LoaderService} from "@app/share/components/utils/loader/loader.service";
import {LoaderComponent} from "@app/share/components/utils/loader/loader.component";
import {RouterLink} from "@angular/router";

const selectors: any[] = [
    // GeneralSelector
]

const editors: any[] = [
    UserEditorComponent,
    AddressEditorComponent
]

const all: any[] = [
    ...selectors,
    ...editors,
    InnerIconComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SideBarComponent,
]

@NgModule({
    declarations: [
        ...all,
    ],
    exports: [
        ...all,
        MaterialModule,
        TranslateModule,
        CommonModule,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule,
        MatSlideToggle,
        FormsModule,
        RouterLink,
    ],
    providers: [
        // {provide: LoaderService}
    ],
})
export class StructsModule {
}
