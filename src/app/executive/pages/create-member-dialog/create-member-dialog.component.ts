import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../../service/Auth/authService';
import { CreateUserModel } from '../../../user/model/CreateUserModel';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TeamService } from '../../../service/Team/TeamService';
import { switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-member-dialog',
  standalone: true,
  imports: [InputTextModule,PasswordModule,CalendarModule,ReactiveFormsModule],
  templateUrl: './create-member-dialog.component.html',
  styleUrl: './create-member-dialog.component.css'
})
export class CreateMemberDialogComponent implements OnInit{
  addUserForm:FormGroup;
  teamId!:number;
  constructor(private fb:FormBuilder,private authService:AuthService,private ref: DynamicDialogRef,private teamService:TeamService,private config: DynamicDialogConfig){
    this.addUserForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.teamId=this.config.data?.teamId;
  }

  saveUser(){
    if(this.addUserForm.valid){
      const user=this.addUserForm.value;
      const userPayload:CreateUserModel = {
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate.toISOString().split('T')[0],
        roles:[ {name:'USER'}]
      };
      console.log(userPayload);
      this.authService.createUser(userPayload).pipe(
        switchMap(response=>{
          const memberId=response.userId
          return this.teamService.addMember(memberId,this.teamId)
        })
      ).subscribe(
        response=>{
          this.closeDialog(true);
        }
      )
    }
  }
  closeDialog(response:any){
    this.ref.close(response);
  }
}
