import { Routes } from '@angular/router';
import {UsersComponent} from "@app/routes/users/users.component";
import {AddressesComponent} from "@app/routes/addresses/addresses.component";
import {SignInComponent} from "@app/routes/signIn/signin.component";
import {AppGuard} from "@app/app-guard";
import {SignupComponent} from "@app/routes/signUp/signup.component";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: "signup",
        component: SignupComponent,
    },
    {
        path: "signin",
        component: SignInComponent,
    },
    {
        path: "login",
        component: SignInComponent,
    },
    {
        path: "users",
        component: UsersComponent,
        canActivate: [AppGuard],
    },
    {
        path: "addresses",
        component: AddressesComponent,
        canActivate: [AppGuard],
    },
];
