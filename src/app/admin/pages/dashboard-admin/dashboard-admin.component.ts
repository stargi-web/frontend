import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/UserService';
import { UserModel } from '../../../user/model/user';
import { UserCardComponent } from '../../../user/card/user-card/user-card.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [ButtonModule,CommonModule,UserCardComponent,TableModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{
  loading=true;

  usersList!:UserModel[];
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    this.getUsers()
  }

  private getUsers(){
    this.userService.getAllUsers().subscribe(
      {
        next:(response:UserModel[])=>{
          this.usersList=response;
        
        },
        error:error=>console.log(error)
      }
    )
    this.loading=false;
  }

}
