import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './user/main/main.component';
import { SavedComponent } from './user/saved/saved.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'registro',component:RegisterComponent},
    {path:'user-view',component:MainComponent},
    {path:'user-saved',component:SavedComponent}
];
