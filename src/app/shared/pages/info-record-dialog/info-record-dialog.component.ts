import { Component, OnInit } from '@angular/core';
import { InfoRecorModel } from '../../model/InfoRecordModel';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InfoRecordService } from '../../../service/InfoRecord/InfoRecordService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-record-dialog',
  standalone: true,
  imports: [TableModule,CommonModule],
  providers:[DialogService, MessageService,InfoRecordService],
  templateUrl: './info-record-dialog.component.html',
  styleUrl: './info-record-dialog.component.css'
})
export class InfoRecordDialogComponent implements OnInit{
  infoId!:number;
  records!:InfoRecorModel[];
  constructor(private infoRecordService:InfoRecordService, private dialogService:DialogService,private ref:DynamicDialogRef,private config:DynamicDialogConfig){}
  ngOnInit(): void {
    this.infoId=this.config.data?.infoId;
    this.loadRecords();
  }
  loadRecords(){
    
      this.infoRecordService.getRecord(this.infoId).subscribe(
        {
          next:(records:InfoRecorModel[])=>{
            this.records=records;
            this.records.forEach((record)=>{
              record.createdAt=new Date(<Date>record.createdAt);
            })
          },
          error:(error)=>{console.error("Error: ",error)}
        }
      )
    
  }
  closeDialog(){
    this.ref.close();
  }
  
}
