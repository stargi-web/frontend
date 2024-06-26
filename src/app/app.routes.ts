import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './user/main/main.component';
import { SavedComponent } from './user/saved/saved.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component';
import { CreateUserComponent } from './admin/pages/create-user/create-user.component';
import { ExecutiveDashboardComponent } from './executive/pages/executive-dashboard/executive-dashboard.component';
import { InfoDashboardComponent } from './admin/pages/info-dashboard/info-dashboard.component';
import { TeamClientsComponent } from './executive/pages/team-clients/team-clients.component';
import { AdminNavigationComponent } from './admin/pages/admin-navigation/admin-navigation.component';
import { TeamsViewComponent } from './admin/pages/teams-view/teams-view.component';
import { TeamsViewComponent as CollectionsView } from './executive/pages/teams-view/teams-view.component';
import { ExecutiveNavigationComponent } from './executive/pages/executive-navigation/executive-navigation.component';
import { ExecutiveTeamMembersComponent } from './executive/pages/executive-team-members/executive-team-members.component';
import { UserNavigationComponent } from './user/user-navigation/user-navigation.component';
import { CollectionsViewComponent } from './user/collections-view/collections-view.component';
import { ClientsAssignedViewComponent } from './user/clients-assigned-view/clients-assigned-view.component';
export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'registro',component:RegisterComponent},
    {
        path: 'admin',
        component: AdminNavigationComponent,
        children: [
          { path: 'create-user', component: CreateUserComponent },
          { path: 'teams-view', component: TeamsViewComponent },
          { path: 'dashboard', component: DashboardAdminComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
    {
      path:'executive',
      component: ExecutiveNavigationComponent,
      children:[
        {path:'dashboard',component:ExecutiveDashboardComponent},
        {path:'team-members',component:ExecutiveTeamMembersComponent},
        {path:'collections',component:CollectionsView},
        {path:'collections/:collectionId',component:TeamClientsComponent},
        {path:'',redirectTo:'dashboard',pathMatch:'full'}
      ]
    },
    {
      path: 'user',
      component: UserNavigationComponent,
      children: [
        { path: '', redirectTo: 'saved', pathMatch: 'full' },
        { path: 'saved', component: SavedComponent },
        { path: 'collections', component: CollectionsViewComponent },
        {path:'collections/:collectionId',component:ClientsAssignedViewComponent}
      ]
    },
];
