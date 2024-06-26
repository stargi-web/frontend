import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientService } from '../../service/client/ClientService';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
interface Stage{
  name:string;
  value:string;
}

@Component({
  selector: 'app-edit-client-dialog',
  standalone: true,
  imports: [DropdownModule,FormsModule,InputTextareaModule,ButtonModule],
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.css'
})
export class EditClientDialogComponent implements OnInit {
  
  stages?:Stage[];
  selectedStage?:Stage;
  clientId?:number;
  newMessage?:string;
  constructor(private ref:DynamicDialogRef,private config: DynamicDialogConfig,private clientService:ClientService){}
  ngOnInit(): void {
    this.stages=[
      {name:'NO CONTACTADO',value:'NO_CONTACTADO'},
      {name:'NO CONTESTA',value:'NO_CONTESTA'},
      {name:'IDENTIFICACIÓN',value:'IDENTIFICACION'},
      {name:'CALIFICACIÓN',value:'CALIFICACION'},
      {name:'PROPUESTA',value:'PROPUESTA'},
      {name:'NEGOCIACIÓN',value:'NEGOCIACION'},
      {name:'CIERRE',value:'CIERRE'}
    ]
    this.clientId= this.config.data?.clientId;
  }
  closeDialog(){
    this.ref.close();
  }
  editClient(){
    this.clientService.modifyClient({
      clientId:this.clientId,
      newStage:this.selectedStage?.value,
      newMessage:this.newMessage
    }).subscribe(
      {
        next:response=>{
          this.ref.close(true)
        },
        error:error=>{
          console.log(error),
          this.ref.close(false)
        }
        
      }
    )
  }
  
}
