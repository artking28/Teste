import { Routes } from '@angular/router';
import {UsersComponent} from "@app/routes/users/users.component";
import {AddressesComponent} from "@app/routes/addresses/addresses.component";
import {SettingsComponent} from "@app/routes/settings/settings.component";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "users",
        component: UsersComponent
    },
    {
        path: "addresses",
        component: AddressesComponent
    },
    {
        path: "settings",
        component: SettingsComponent
    },
];
