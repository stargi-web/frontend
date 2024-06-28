import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/Auth/authService';
import { logInUser } from '../service/Auth/model/logInUser';
import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule,InputTextModule,CardModule,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  disableButton:boolean=false;
  credentials=this.formBuilder.group({
    userName:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });
  constructor(private router:Router,private authService:AuthService,private formBuilder:FormBuilder){
    
  }
  ngOnInit(): void {
    
  }
  ngSubmit(){
    this.disableButton=true;
    this.authService.logIn(this.credentials.value as logInUser)
    .subscribe({
      next:(userData)=>{
        console.log(userData);
        this.authService.redirectToRoleBasedComponent();
      },
      error:(errorData)=>{
        console.error(errorData);
      }
    }
    )
    
    
  }
}
