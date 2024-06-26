import { Component } from '@angular/core';
import { CreateUserModel } from '../../../user/model/CreateUserModel';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/Auth/authService';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm:FormGroup;
  rolesOptions = [
    { label: 'EXECUTIVE', value: 'EXECUTIVE' },
    { label: 'SALESMANAGER', value: 'SALESMANAGER' },
    { label: 'USER', value: 'USER' }
  ];
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      roles: this.fb.array([
        this.fb.group({
          name: ['EXECUTIVE', Validators.required]
        })
      ])
    });
  }
  onSubmit(){
    if(this.userForm.valid){
      const formValue=this.userForm.value;
      const createUserModel:CreateUserModel={
        ...formValue,
        roles:formValue.roles
      };
      this.authService.createUser(createUserModel).subscribe(
        {
          next:(response)=>{
            console.log("Creado exitosamente");
          },
          error:error=>console.log("Error: ",error)
        }
      )
    }
  }
}
