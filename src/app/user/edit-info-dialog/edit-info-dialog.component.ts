import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InfoService } from '../main/infoService';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { EditInfoModel } from '../model/EditInfoModel';
@Component({
  selector: 'app-edit-info-dialog',
  standalone: true,
  providers:[DialogService,MessageService,InfoService],
  imports: [ButtonModule,DropdownModule,FormsModule,InputTextareaModule,CalendarModule],
  templateUrl: './edit-info-dialog.component.html',
  styleUrl: './edit-info-dialog.component.css'
})
export class EditInfoDialogComponent implements OnInit {
  infoId?:number;
  newStage?:string;
  newCommentary?:string;
  newExpirationAt?:Date;
  newCloseAt?:Date;
  selectedStatus:string='';
  stageOptions:string[]=['IDENTIFICACION', 'CALIFICACION', 'PROPUESTA', 'NEGOCIACION', 'CIERRE'];
  constructor(private infoService:InfoService,private dialogService:DialogService,private ref:DynamicDialogRef,private config: DynamicDialogConfig){}
  ngOnInit(): void {
    this.infoId=this.config.data?.infoId;
    this.newStage=this.config.data?.newStage;
    this.newCommentary=this.config.data?.newCommentary;
    this.newExpirationAt=this.config.data?.newExpirationAt;
    this.newCloseAt=this.config.data?.newCloseAt;
  }
  onClose(){
    this.ref.close(false);
  }
  onSave(){
    
    if(this.infoId!=undefined&&this.newExpirationAt!=undefined&&this.newCloseAt!=undefined){
      const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
      const body:EditInfoModel={
        newStage:this.newStage,
        newCommentary:this.newCommentary,
        newExpirationAt:formatDate(this.newExpirationAt),
        newCloseAt:formatDate(this.newCloseAt)
      }
      console.log("Entrando guardado");
      this.infoService.editInfo(this.infoId,body).subscribe(
        {
          next:(response)=>{
            console.log("Editado exitosamente",response)
          },
          error:error=>{
            console.log("Error:",error);
          }
        }
      )
    }
    this.ref.close(true);
    
  }
}
