import {Component} from "@angular/core";
import {ModalSummoner} from "@app/share/modal-summoner";


@Component({
    standalone: true,
    template: "",
    selector: "sign-in-component",
})
export class SignInComponent {

    constructor() {
        console.log("SignIn Component constructor");
        ModalSummoner.openLogin()
    }
}
