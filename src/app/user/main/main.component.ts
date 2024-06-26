import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { InfoService } from './infoService';
import { info } from './info';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  selected:string='';
  opciones: string[]=["Perú","Brazil","Ecuador","Argentina","Chile","Bolivia","Paraguay","Uruguay"] ;
  infoToSend=this.formBuilder.group({
    ruc:['',Validators.required],
    businessName:['',Validators.required],
    country:['',Validators.required],
    userId:[Number(),Validators.required]
  })
  constructor(private router:Router,private formBuilder:FormBuilder,private infoService:InfoService){
    
  }
  ngOnInit(): void {
    
  }

  onSelect(opcion:string){
    this.selected=opcion;
  }
  ngSubmit(){
    //console.log("Inicio de envio de archivos");
    //if(this.selected!=''){
    //  console.log("Entrado a primer if");
    //  this.infoToSend.patchValue({
    //    userId: Number(sessionStorage.getItem("userId")),
    //    country: this.selected
    //  });
    //  console.log(this.infoToSend.value);
    //  console.log(this.infoToSend.valid);
    //  if(this.infoToSend.valid){
    //    console.log("Form validado");
    //    this.infoService.createInfo(this.infoToSend.value as info)
    //    .subscribe({
    //      next:response=>{
    //        console.log('Respuesta exitosa:', response);
    //      },
    //      error:error=>{
    //        console.error("Error al enviar datos: ",error);
    //      }
    //    }
    //  )
  //
    //  }
    //}
    
  }
}
