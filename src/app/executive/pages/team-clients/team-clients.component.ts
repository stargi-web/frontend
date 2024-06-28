import { Component,  OnInit, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClientModule } from '../../../shared/model/ClientModel';
import { ClientService } from '../../../service/client/ClientService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule}from 'primeng/toast'
import { ClientCollectionService } from '../../../service/ClientCollection/ClientCollectionService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssignUserClientComponent } from '../assign-user-client/assign-user-client.component';

@Component({
  selector: 'app-team-clients',
  standalone: true,
  imports: [TableModule,CommonModule,ButtonModule,FileUploadModule,ToastModule],
  providers:[DialogService],
  templateUrl: './team-clients.component.html',
  styleUrl: './team-clients.component.css'
})
export class TeamClientsComponent implements OnInit {

  collectionId!:number;
  clients: ClientModule[] = [];
  totalRecords = 0;
  page = 0;
  size = 10;
  sortBy = 'id';
  loading=true;
  haveClients!:boolean;
  columns: any[] = [];
  uploadedFiles:any[]=[];
  disableButton:boolean=false;
  constructor(public dialogService:DialogService,private route: ActivatedRoute,private clientService:ClientService,private clientCollectionService:ClientCollectionService){}
  ref:DynamicDialogRef|undefined;
  ngOnInit(): void {
    this.collectionId=Number(this.route.snapshot.paramMap.get('collectionId'));
    this.loadClients();

  }
  loadClients(){
    this.clientCollectionService.ifCollectionHasClient(this.collectionId).subscribe(
      {
        next:(response)=>{
          this.haveClients=response;
        },error:error=>console.error(error)
      }
    )
    this.clientService.getClientsByCollectionPaged(this.collectionId,this.page,this.size,this.sortBy)
    .subscribe(
      {
        next:(response)=>{
          this.clients = response.content.map((client: any) => ({
            ...client,
            dataInfo: JSON.parse(client.dataInfo)
          }));
          console.log(this.clients);
          this.totalRecords=response.totalElements;
          this.setColumns();
          this.loading=false;
          
        },
        error:error=>console.error(error)
      }
    )
  }
  setColumns() {
    if (this.clients.length > 0) {
      const firstClient = this.clients[0];
      this.columns = [{ field: 'id', header: 'ID' }, { field: 'stage', header: 'Stage' }];
      const dataInfoKeys = Object.keys(firstClient.dataInfo || {});
      dataInfoKeys.forEach(key => {
        this.columns.push({ field: key, header: key });
      });
    }
  }

  OnPageChange(event:any){
    this.page=event.page;
    this.size=event.rows;
    this.loadClients;
  }

  openFilePicker() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
      
    }
  }
  uploadFile(file:File){
    this.disableButton=true;
    this.clientService.createClients(file,this.collectionId).subscribe(
      {
        next: (response) => {
          if (response === 1) {
            window.location.reload();
          }
        },
        error: (error) => console.error(error),
      }
    )
  }
  assignUserDialog(clientId:number){
    const config={
      data: {
        clientId:clientId
      },
      header:'Usuario al cliente',
      width: '50vw'
    }
    this.ref=this.dialogService.open(AssignUserClientComponent,config)
  }

}
