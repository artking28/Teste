import { Routes } from '@angular/router';
import {UsersComponent} from "@app/routes/users/users.component";
import {AddressesComponent} from "@app/routes/addresses/addresses.component";
import {SignInComponent} from "@app/routes/signIn/signin.component";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "signin",
        component: SignInComponent
    },
    {
        path: "login",
        component: SignInComponent
    },
    {
        path: "users",
        component: UsersComponent
    },
    {
        path: "addresses",
        component: AddressesComponent
    },
];
