import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-user-navigation',
  standalone: true,
  imports: [RouterModule,MenubarModule,BadgeModule,CommonModule],
  templateUrl: './user-navigation.component.html',
  styleUrl: './user-navigation.component.css'
})
export class UserNavigationComponent implements OnInit {
  items?:MenuItem[];
  constructor(private router:Router){}
  ngOnInit(): void {
    this.items=[
      {
        label:'Inicio',
        icon:'pi pi-home',
        route:'/user/saved'
      },
      {
        label:'Colecciones',
        icon:'pi pi-star',
        route:'/user/collections'
      },
      {
        label:'Cerrar Sesión',
        icon:'pi pi-times-circle',
        route:'/login',
        
      }
    ]
  }
  

}
