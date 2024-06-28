import { Component } from '@angular/core';
import { TeamService } from '../../../service/Team/TeamService';
import {  InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import e from 'express';
@Component({
  selector: 'app-create-team-dialog',
  standalone: true,
  imports: [InputTextModule,FormsModule,ButtonModule],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.css'
})
export class CreateTeamDialogComponent {


  teamName?:string;
  constructor(private teamService:TeamService,private ref: DynamicDialogRef){}
  createTeam() {
    if(this.teamName)
    this.teamService.createGroup(this.teamName).subscribe(
      {
        next:response=>{
          this.ref.close(true);
        },
        error:error=>{
          console.error(error);
          this.ref.close(false);
        }
      }
    )
  }
}
