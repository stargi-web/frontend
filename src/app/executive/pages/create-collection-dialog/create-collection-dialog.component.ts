import { Component } from '@angular/core';
import {  DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ClientCollectionService } from '../../../service/ClientCollection/ClientCollectionService';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-create-collection-dialog',
  standalone: true,
  imports: [FormsModule,InputTextModule,ButtonModule],
  templateUrl: './create-collection-dialog.component.html',
  styleUrl: './create-collection-dialog.component.css'
})
export class CreateCollectionDialogComponent {
  value!:string;
  constructor(private ref:DynamicDialogRef,private config:DynamicDialogConfig,private collectionService:ClientCollectionService){}
  createCollection(){
    if(this.value!==""){
      const userId=Number(sessionStorage.getItem("userId"))
    this.collectionService.createCollection({
      userId:userId,
      title:this.value
    }).subscribe({
      next:response=>{
        console.log("Coleccion creada")
      },error:error=>{console.error(error)}
    })
    }
    
  }
}
