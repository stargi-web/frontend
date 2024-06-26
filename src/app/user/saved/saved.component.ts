import { Component, OnInit } from '@angular/core';
import { InfoModel } from './model/InfoModel';
import { InfoService } from '../main/infoService';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CreateInfoModel } from './model/CreateInfoModel';
import { EditInfoDialogComponent } from '../edit-info-dialog/edit-info-dialog.component';
import { Header, MessageService } from 'primeng/api';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoRecordDialogComponent } from '../../shared/pages/info-record-dialog/info-record-dialog.component';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
interface Gerente{
  name:string
}
interface Etapa{
  name:string
}
interface Opcion{
  name:string,
  code:string
}
interface Notification{
  ruc:string,
  message:string
}
@Component({
  
  selector: 'app-saved',
  standalone: true,
  providers:[DialogService, MessageService],
  imports: [NotificationsDialogComponent,InfoRecordDialogComponent,CalendarModule,FormsModule,DialogModule,ButtonModule,CommonModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent implements OnInit{
  datos:InfoModel[] ;
  createInfoDialogDisplay:boolean=false;
  loading:boolean=true;
  gerenteVentas:Gerente[]|undefined;
  selectedGerente:Gerente|undefined;
  ejecutivos:Gerente[]|undefined;
  selectedEjecutivo:Gerente[]|undefined;
  etapasVenta:Etapa[]|undefined;
  selectedEtapa:Etapa|undefined;
  date:Date|undefined;
  value?:string;
  /////Multi Select
  opciones!:Opcion[];
  selectedOptions!:Opcion[];
  isOtherSelected=false;
  otherOption='';
  ///Fin Multi select
  // Aquí debe ir los datos para guardar info
  ruc: string = '';
  businessName: string = '';
  country: string = '';
  commentary: string = '';
  oppNumber: string = '';
  product: string = '';
  units: string = '';
  realRent: string = '';
  contact: string = '';
  contactNumber: string = '';
  email: string = '';
  expirationAt!: Date;
  updatedAt!: Date;
  closeAt!: Date;

  //fin de guardar datos de info
  notifications:Notification[]=[];

  ref: DynamicDialogRef | undefined;
  constructor(private infoService:InfoService,public dialogService: DialogService, public messageService: MessageService){
    this.datos=[];
    
  }
  ngOnInit(): void {
    this.opciones=[
      {name:'VOZ',code:'1'},
      {name:'VENTA',code:'2'},
      {name:'GPON',code:'3'},
      {name:'DBI',code:'4'},
      {name:'SVA',code:'5'},
      {name:'BAM',code:'6'},
    ];
    this.gerenteVentas=[{
      name:'JOSE RODRIGUEZ'
    }];
    this.ejecutivos=[
      {name:'CARMEN RODRIGUEZ'},
      {name:'GEOVANA CAPCHA'},
      {name:'JOEL CHUNQUE'},
      {name:'LEONCIO HERRERA'},
      {name:'YORGINA VICENTE'}
    ];
    this.etapasVenta=[
      {name:'IDENTIFICACION'},
      {name:'CALIFICACION'},
      {name:'PROPUESTA'},
      {name:'NEGOCIACION'},
      {name:'CIERRE'}
    ];
    this.getInfo();
    console.log(this.notifications);
  }


  showDialog(){
    this.createInfoDialogDisplay=true;
  }
  saveInfo(){
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };
    const userId=Number(sessionStorage.getItem("userId"));
    const newInfo:CreateInfoModel={
      ruc:this.ruc,
      businessName:this.businessName,
      country:this.country,
      userId:userId,
      stage:this.selectedEtapa?.name||'',
      commentary:this.commentary,
      oppNumber:this.oppNumber,
      product: this.selectedOptions.map(option => option.name).join(' '),
      units: Number(this.units),
      realRent: Number(this.realRent),
      contact: this.contact,
      contactNumber: this.contactNumber,
      email: this.email,
      expirationAt: formatDate(this.expirationAt),
      updatedAt: formatDate(new Date()),
      closeAt: formatDate(this.closeAt),
      salesManagerId: 1,
      executiveId: 1
    }
    this.infoService.createInfo(newInfo).subscribe(
      {
        next:(response)=>{
          console.log("Creación exitosa!!");
          window.location.reload();
        },
        error:(error)=>{
          console.error("Error",error);
        }
      
      }
    );
    
    this.createInfoDialogDisplay=false;
    window.location.reload();
  }
  deleteInfo(infoId:number){
    this.infoService.deleteInfo(infoId).subscribe(
      {
        next:(response)=>{
          console.log("operación exitosa");
        },error:error=>{console.log("Error:",error)}
      }
    )
  }
  editInfo(infoId:number,newStage:string,newCommentary:string,newExpirationAt:Date,newCloseAt:Date){
    const config={
      data: {
        infoId,
        newStage,
        newCommentary,
        newExpirationAt,
        newCloseAt
      },
      header:'Editar registro',
      width: '50vw'
    }
    this.ref=this.dialogService.open(EditInfoDialogComponent,config);
    this.ref.onClose.subscribe((data:any)=>{
      if(data){
        console.log("Actualizando datos");
        this.loading=true;
        window.location.reload();
      }
      console.log("Cerrado");
    })
    
  }
  showRecord(infoId:number){
    const config={
      data:{
        infoId
      },
      header:'Registro de cambios',
      width:'50vw'
    }
    this.ref=this.dialogService.open(InfoRecordDialogComponent,config);
    this.ref.onClose.subscribe((data:any)=>{
     
    })
  }
  showNotifications(){
    const config={
      data:{
        notifications:this.notifications
      },
      header:'Registro de cambios',
      width:'50vw'
    }
    this.ref=this.dialogService.open(NotificationsDialogComponent,config);
    this.ref.onClose.subscribe((data:any)=>{
     
    })
  }
  private formatDate(dateString: string): Date {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    return correctedDate;
  }
  private createNotificacions(ruc:string,expirationDate:Date){

    const currentDate = new Date();
    const differenceInTime = expirationDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays < 15) {
      this.notifications.push({ruc:ruc,message:`Faltan ${differenceInDays} días para la fecha de expiración`});
    }
  }
  getInfo(){
    
    const userId=Number(sessionStorage.getItem("userId"))
    this.infoService.getInfo(userId).subscribe(
      {
        next:(response:InfoModel[])=>{
          this.datos=response;
          
          this.datos.forEach((dato)=>{
            dato.updatedAt=this.formatDate(<string>dato.updatedAt);
            dato.expirationAt=this.formatDate(<string>dato.expirationAt);
            dato.closeAt=this.formatDate(<string>dato.closeAt);
            if(dato.ruc!=null){
            this.createNotificacions(dato.ruc,dato.expirationAt);}
         
            
          });
          this.loading=false;
        },
        error:(error)=>{
          console.error("Error: ",error);
          this.loading=false;
        }
      }
    )
  }
}
