import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../service/user/UserService';
import { catchError, of, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../../service/client/ClientService';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-assign-user-client',
  standalone: true,
  imports: [DropdownModule,FormsModule,ButtonModule],
  templateUrl: './assign-user-client.component.html',
  styleUrl: './assign-user-client.component.css'
})
export class AssignUserClientComponent implements OnInit{

  clientId?:number
  teamMembers?:any[]
  teamId?:number
  selectedMember?:any
  constructor(private ref:DynamicDialogRef,private config:DynamicDialogConfig,private userService:UserService,private clientService:ClientService){}
  ngOnInit(): void {
    this.clientId=this.config.data?.clientId;
    this.loadTeamMembers();
  }
  loadTeamMembers(){
    const userId=Number(sessionStorage.getItem('userId'));
    this.userService.isUserLeader(userId).pipe(
      switchMap(response=>{
        this.teamId=response.teamId;
        console.log(response);
        if (response.leader&&this.teamId) {          
          return this.userService.getUserByTeam(this.teamId);
        } else {
          return of([]); 
        }
      }),catchError(error => {
        console.error(error);
        return of([]);
      })
    ).subscribe({
      next:response=>{
        this.teamMembers=response
      }
    })
  }
  assignUserToClient(){
    if(this.clientId){
      this.clientService.assigClientToUser(this.clientId,this.selectedMember.userId).subscribe(
        {
          next:response=>{
            console.log("ASignado con éxtio")
            this.ref.close(true);
          },error:error=>console.error(error)
        }
      );
    }
    
  }
}
