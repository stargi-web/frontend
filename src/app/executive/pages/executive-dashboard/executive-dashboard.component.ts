import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InfoModel } from '../../../user/saved/model/InfoModel';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user/UserService';
import { InfoService } from '../../../user/main/infoService';
import { catchError, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent implements OnInit{
  isLeader?:boolean;
  teamId?:number;
  infos!:InfoModel[];
  loading:boolean=true;
  ngOnInit(): void {
    this.init();
 
    
  }
  constructor(private userService:UserService,private infoService:InfoService){}
  showRecord(infoId:number){}
  init(){
    const userId=Number(sessionStorage.getItem("userId"));
    this.userService.isUserLeader(userId).pipe(
      switchMap(response=>{
        this.isLeader=response.leader;
        this.teamId=response.teamId;
        if (this.isLeader&&this.teamId) {
          return this.infoService.getInfoByTeam(this.teamId);
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
      next: (infos: InfoModel[]) => {
        if (this.isLeader) {
          this.infos = infos;
        }
        this.loading = false;
      }
    });
  }

}
