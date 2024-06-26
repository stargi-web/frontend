import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/UserService';
import { TeamService } from '../../../service/Team/TeamService';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
interface User{
  userId:number,
  userName:string,
  firstName:string,
  lastName:string
}
@Component({
  selector: 'app-assign-leader-dialog',
  standalone: true,
  imports: [DropdownModule,FormsModule,ButtonModule],
  templateUrl: './assign-leader-dialog.component.html',
  styleUrl: './assign-leader-dialog.component.css'
})
export class AssignLeaderDialogComponent implements OnInit {

  teamId?:number
  users:User[]=[]
  selectedUser?:User
  constructor(private userService:UserService,private teamService:TeamService, private ref: DynamicDialogRef,private config: DynamicDialogConfig){}
  ngOnInit(): void {
    this.teamId=this.config.data?.teamId;
    this.userService.getUserByRol('EXECUTIVE').subscribe({
      next:response=>{
        this.users=response;
      },error:error=>console.error(error)
    })
  }
  assignLeader() {
    if(this.selectedUser&&this.teamId){
      this.teamService.modifyLeader(this.selectedUser.userId,this.teamId).subscribe(
        {
          next:response=>{
            this.ref.close(true);
          },
          error:error=>{console.error(error)}

        }
      )
    }
    
  }


}
