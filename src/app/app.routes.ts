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
import { authGuardGuard } from './guard/auth-guard.guard';
import { hasRoleGuard } from './guard/has-role.guard';
export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'registro',component:RegisterComponent},
    {
        path: 'admin',
        component: AdminNavigationComponent,
        canActivate:[authGuardGuard,hasRoleGuard],
        data:{allowedRoles:['ADMIN']},
        children: [
          { path: 'create-user', data:{allowedRoles:['ADMIN']},component: CreateUserComponent },
          { path: 'teams-view',  data:{allowedRoles:['ADMIN']},component: TeamsViewComponent },
          { path: 'dashboard', data:{allowedRoles:['ADMIN']},component: DashboardAdminComponent },
          { path: '', redirectTo: 'dashboard', data:{allowedRoles:['ADMIN']},pathMatch: 'full' },
        ],
    },
    {
      path:'executive',
      component: ExecutiveNavigationComponent,
      canActivate:[authGuardGuard,hasRoleGuard],
      data:{allowedRoles:['EXECUTIVE']},
      children:[
        {path:'dashboard',data:{allowedRoles:['EXECUTIVE']},component:ExecutiveDashboardComponent},
        {path:'team-members',data:{allowedRoles:['EXECUTIVE']},component:ExecutiveTeamMembersComponent},
        {path:'collections',data:{allowedRoles:['EXECUTIVE']},component:CollectionsView},
        {path:'collections/:collectionId',data:{allowedRoles:['EXECUTIVE']},component:TeamClientsComponent},
        {path:'',redirectTo:'dashboard',data:{allowedRoles:['EXECUTIVE']},pathMatch:'full'}
      ]
    },
    {
      path: 'user',
      component: UserNavigationComponent,
      data:{allowedRoles:['USER']},
      canActivate:[authGuardGuard,hasRoleGuard],
      children: [
        { path: '', redirectTo: 'saved', data:{allowedRoles:['USER']},pathMatch: 'full' },
        { path: 'saved', data:{allowedRoles:['USER']},component: SavedComponent },
        { path: 'collections', data:{allowedRoles:['USER']},component: CollectionsViewComponent },
        {path:'collections/:collectionId',data:{allowedRoles:['USER']},component:ClientsAssignedViewComponent}
      ]
    },
];
