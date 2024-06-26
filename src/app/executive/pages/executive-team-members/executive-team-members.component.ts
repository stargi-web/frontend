import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../../service/user/UserService';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateMemberDialogComponent } from '../create-member-dialog/create-member-dialog.component';
import { catchError, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-executive-team-members',
  standalone: true,
  imports: [TableModule,ButtonModule],
  providers:[DialogService],
  templateUrl: './executive-team-members.component.html',
  styleUrl: './executive-team-members.component.css'
})
export class ExecutiveTeamMembersComponent implements OnInit {
  members:any[]=[];
  teamId?:number;
  loading=true;
  isLeader!:boolean;
  constructor(public dialogService:DialogService,private userService:UserService,private route: ActivatedRoute){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(){
    const userId=Number(sessionStorage.getItem("userId"));
    this.userService.isUserLeader(userId).pipe(
      switchMap(response=>{
        this.isLeader=response.leader;
        this.teamId=response.teamId;
        console.log(response);
        if (this.isLeader&&this.teamId) {
          
          return this.userService.getUserByTeam(this.teamId);
        } else {
          this.loading = false;
          return of([]); 
        }
      }),catchError(error => {
        console.error(error);
        this.loading = false;
        return of([]);
      })
    ).subscribe({
      next:(response)=>{
        this.members=response;
        this.loading=false;
      }
    });
  }
  createMemberDialog(){
    const config={
      data: {
        teamId:this.teamId
      },
      header:'Añadir integrante al equipo',
      width: '50vw'
    }
    this.ref=this.dialogService.open(CreateMemberDialogComponent,config)
  }
}
