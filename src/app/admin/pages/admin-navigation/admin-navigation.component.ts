import { Component, OnInit } from '@angular/core';
import {MenuModule} from'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [MenuModule,MenubarModule],
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent implements OnInit{

  items?:MenuItem[]
  constructor(private router:Router){}
  ngOnInit(): void {
    this.items=[
      {
        label:'Dashboard',
        icon:'pi pi-home',
        route:'/admin/dashboard'
      },
      {
        label:'Crear usuario',
        icon:'pi pi-user',
        route:'/admin/create-user'
      }, 
      {
        label:'Equipos',
        icon:'pi pi-inbox',
        route:'/admin/teams-view'
      },
      {
        label:'Cerrar Sesión',
        icon:'pi pi-times-circle',
        route:'/login',
        
      }
    ]
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
