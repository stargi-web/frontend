import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TeamService } from '../../../service/Team/TeamService';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignLeaderDialogComponent } from '../assign-leader-dialog/assign-leader-dialog.component';
import { CreateTeamDialogComponent } from '../create-team-dialog/create-team-dialog.component';
@Component({
  selector: 'app-teams-view',
  standalone: true,
  imports: [TableModule,ButtonModule],
  providers:[DialogService],
  templateUrl: './teams-view.component.html',
  styleUrl: './teams-view.component.css'
})
export class TeamsViewComponent implements OnInit {


  teams:any[]=[];
  constructor(private teamService:TeamService,private dialogService: DialogService){}
  ref: DynamicDialogRef | undefined;
  ngOnInit(): void {
    this.loadTeams();
  }
  loadTeams(){
    this.teamService.getAllTeams().subscribe(
      {
        next:response=>{
          this.teams=response;
        },
        error:error=>console.error(error)
      }
    )
  }
  modifyLeader(teamId: number) {
    const config={
      data: {
        teamId:teamId
      },
      header:'Asignar lider al equipo',
      width: '50vw',
      height: '70vh'
    }
    this.ref=this.dialogService.open(AssignLeaderDialogComponent,config);
    this.ref.onClose.subscribe(response=>{
      if(response==true){
        window.location.reload();
      }
    })
    
  }
  addTeam() {
    const config={
      
      header:'Crear equipo',
      width: '50vw',
      height: '70vh'
    }
    this.ref=this.dialogService.open(CreateTeamDialogComponent,config);
    this.ref.onClose.subscribe(response=>{
      if(response==true){
        window.location.reload();
      }
    })
  }

}
