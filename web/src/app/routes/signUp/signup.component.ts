import {Component} from "@angular/core";
import {ModalSummoner} from "@app/share/modal-summoner";


@Component({
    standalone: true,
    template: "",
    selector: "sign-up-component",
})
export class SignupComponent {

    constructor() {
        // console.log("SignUp Component constructor");
        ModalSummoner.openSignUp()
    }
}
