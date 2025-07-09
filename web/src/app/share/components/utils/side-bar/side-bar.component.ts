import {Component} from "@angular/core";
import {BasePiece} from "@app/share/founding-files/base-piece";
import {UserCache} from "@app/share/cache/UserCache";
import {User} from "@app/share/models/User";
import {UserService} from "@app/share/services/user.service";
import {ModalSummoner} from "@app/share/modal-summoner";
import {Signal} from "@app/share/models/utility/Signal";
import {Err, Some} from "@app/share/models/utility/Result";
import {DataUtil} from "@app/share/models/utility/DataUtil";
import {GlobalsVars} from "@app/share/globalsVars";
import {LoginResponseDTO} from "@app/share/models/utility/LoginResponseDTO";
import {Proc} from "@app/share/components/utils/abstract-listar/abstract-listar.component";


@Component({
    standalone: false,
    selector: 'side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['side-bar.components.scss']
})
export class SideBarComponent extends BasePiece {

    menus: any[] = [
        {
            id: "profile",
            label: 'my.profile',
            icon: 'account_circle',
            route: null,
            permissions: [],
            proc: () => this.editSelf()
        },
        {
            id: "users",
            label: 'my.users',
            icon: 'group',
            route: '/users',
            permissions: ['admin'],
            proc: null
        },
        {
            id: "addresses",
            label: 'my.addresses',
            icon: 'distance',
            route: '/addresses',
            permissions: [],
            proc: null
        },
        {
            id: "logout",
            label: 'Logout',
            icon: 'chip_extraction',
            route: null,
            permissions: [],
            proc: () => this.UserCache.signOutCache()
        }
    ];

    emitterSelfEditor: Signal = new Signal((result) => {
        switch (result.constructor) {
            case (Some):
                const someObj = result as Some<User>;
                this.userService.quickUpdate(someObj.value).subscribe({
                    next: (res) => {
                        this.userService.httpService.hideLoader()
                        if (res.isOk(true)) {
                            let lro = someObj.value.toLRO(someObj.adds.get("loginAt"))
                            lro.token = res.result
                            UserCache.signInCache(lro, true)
                        }
                    },
                    error: _ => {
                        this.userService.httpService.hideLoader()
                        let du = new DataUtil<User>(someObj.value)
                        du.returns.set("loginAt", someObj.adds.get("loginAt"))
                        du.forceEditMode = true
                        ModalSummoner.openUserEditor(this.emitterSelfEditor, du)
                    }
                })
                break
            case (Err):
                // let err = result as Err;
        }
    })

    constructor(private  userService: UserService) {
        super();
    }

    editSelf() {
        if(!UserCache.getInstance().ok) {
            UserCache.signOutCache()
            return
        }
        let self = UserCache.getInstance()!
        let du = new DataUtil(self.toUser())
        du.returns.set("loginAt", self.loginAt)
        du.forceEditMode = true
        ModalSummoner.openUserEditor(this.emitterSelfEditor, du)
    }

    protected readonly UserCache = UserCache;
}
