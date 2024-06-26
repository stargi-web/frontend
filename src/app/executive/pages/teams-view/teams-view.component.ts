import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClientCollectionService } from '../../../service/ClientCollection/ClientCollectionService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCollectionDialogComponent } from '../create-collection-dialog/create-collection-dialog.component';
export interface CollectionModel{
  collectionId:number,
  collectionName:string
}


@Component({
  selector: 'app-teams-view',
  standalone: true,
  imports: [TableModule,CommonModule,ButtonModule],
  providers:[DialogService],
  templateUrl: './teams-view.component.html',
  styleUrl: './teams-view.component.css'
})
export class TeamsViewComponent implements OnInit{

  
  collections!:CollectionModel[];
  loading:boolean=true;
  
  constructor(public dialogService:DialogService,private clientCollectionService:ClientCollectionService,private router: Router){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    const userId=Number(sessionStorage.getItem("userId"));
    this.clientCollectionService.getCollectionsByUserId(userId).subscribe(
      {
        next:(response:CollectionModel[])=>{
          this.collections=response;
          this.loading=false;
        },
        error:error=>console.error(error)
      }
    )
  }
  onRowSelect(event:any){
    const selectedCollection=event.data;
    console.log("Redir");
    this.router.navigate(['/view-client', selectedCollection.collectionId]);
  }
  accesToCollection(collectionId:number){
    this.router.navigate(['/executive/collections', collectionId]);
  }
  createCollectionDialog() {
    const config={
      header:'Crear coleccion',
      width: '50vw'
    }
    this.ref=this.dialogService.open(CreateCollectionDialogComponent,config)
  }

}
