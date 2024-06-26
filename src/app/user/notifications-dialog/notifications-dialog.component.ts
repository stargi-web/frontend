import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-dialog',
  standalone: true,
  imports: [TableModule,CommonModule],
  providers:[DialogService, MessageService],
  templateUrl: './notifications-dialog.component.html',
  styleUrl: './notifications-dialog.component.css'
})
export class NotificationsDialogComponent implements OnInit{
  notifications!:[]
  constructor(private dialogService:DialogService,private ref:DynamicDialogRef,private config:DynamicDialogConfig){}
  ngOnInit(): void {
    console.log(this.config.data);
    this.notifications=this.config.data?.notifications;
    console.log(this.notifications);
  }
  
}
