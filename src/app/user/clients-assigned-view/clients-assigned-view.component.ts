import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client/ClientService';
import { ClientModule } from '../../shared/model/ClientModel';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import {  ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditClientDialogComponent } from '../edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clients-assigned-view',
  standalone: true,
  imports: [TableModule,ButtonModule],
  providers:[DialogService],
  templateUrl: './clients-assigned-view.component.html',
  styleUrl: './clients-assigned-view.component.css'
})
export class ClientsAssignedViewComponent implements OnInit{

  clients:ClientModule[]=[];
  collectionId!:number;
  columns:any[]=[];
  loading=true;
  constructor(public dialogService: DialogService,private clientService:ClientService,private route:ActivatedRoute){}
  ref: DynamicDialogRef | undefined;
  ngOnInit(): void {
    this.collectionId=Number(this.route.snapshot.paramMap.get('collectionId'));
    this.loadClients();
    
  }
  loadClients(){
    const userId=Number(sessionStorage.getItem("userId"))
    this.clientService.getClientsByUserAndCollection(userId,this.collectionId).subscribe(
      {
        next:(clients)=>{
          this.clients=clients.map((client: any) => ({
            ...client,
            dataInfo: JSON.parse(client.dataInfo)
          }))
          this.setColumns();
          this.loading=false;
          console.log(this.clients)

        },error:error=>console.error(error)
      }
    )
  }
  setColumns() {
    if (this.clients.length > 0) {
      const firstClient = this.clients[0];
      this.columns = [
        { field: 'stage', header: 'Estado' },
        { field: 'modify', header: 'Acción' },
        {field:'message',header:'Mensaje'}
      ];
      const dataInfoKeys = Object.keys(firstClient.dataInfo||{});
      dataInfoKeys.forEach(key => {
        this.columns.push({ field: key, header: key });
      });
    }
    console.log(this.columns)
  }
  modifyClient(clientId: number): void {
    this.ref=this.dialogService.open(EditClientDialogComponent,{
      data:{
        clientId:clientId
      },
      header:'Modificar cliente'
    })
    console.log('Modificar cliente:', clientId);
  }
}
