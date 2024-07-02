import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-executive-navigation',
  standalone: true,
  imports: [RouterModule,MenubarModule],
  templateUrl: './executive-navigation.component.html',
  styleUrl: './executive-navigation.component.css'
})
export class ExecutiveNavigationComponent implements OnInit {
  items?:MenuItem[];
  constructor(private router:Router){}
  ngOnInit(): void {
    this.items=[
      {
        label:'Dashboard',
        icon:'pi pi-home',
        route:'/executive/dashboard'
      },
      {
        label:'Miembros del equipo',
        icon:'pi pi-user',
        route:'/executive/team-members'
      }, 
      {
        label:'Colecciones',
        icon:'pi pi-inbox',
        route:'/executive/collections'
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
