import { Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpClientModule } from "@angular/common/http";
import { logInUser } from "./model/logInUser";
import { Injectable } from "@angular/core";
import { CreateUserModel } from "../../user/model/CreateUserModel";
import { Router } from '@angular/router';
import jwt_decode, { jwtDecode } from 'jwt-decode';
@Injectable({
    providedIn:'root',
})

export class AuthService{


    constructor(private http:HttpClient,private router:Router){

    }

    createUser(body:CreateUserModel):Observable<any>{
      return this.http.post(`https://stargibackend.uc.r.appspot.com/api/v1/auth/signUp`,body)
      .pipe(tap((userData)=>{
        console.log("Creado exitosamente");
        })
        ,catchError(this.handleError)
      )
    }

    logIn(credentials:logInUser):Observable<any>{
        return this.http.post<any>('https://stargibackend.uc.r.appspot.com/api/v1/auth/signIn',credentials)
        .pipe(tap((userData)=>{
            console.log(userData);
            sessionStorage.setItem("token",userData.token);
            sessionStorage.setItem("userId",userData.userId);
            console.log("Exitoso, token: "+userData.token);
        }),catchError(this.handleError))
    }
    private handleError(error:HttpErrorResponse){
        if(error.status===0){
          console.error('Se ha producio un error ', error.error);
        }
        else{
          console.error('Backend retornó el código de estado ', error);
        }
        return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
    }
    logout():void{
        sessionStorage.removeItem("token");
    }
      decodeToken(token: string) {
        try {
          return jwtDecode(token);
          
        } catch (error) {
          console.error('Error decodificando el token:', error);
          return null;
        }
      }
    
      redirectToRoleBasedComponent() {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: any = this.decodeToken(token);
          const roles = decodedToken?.roles || [];
    
          if (roles.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('USER')) {
            this.router.navigate(['/user']);
          } else if (roles.includes('SALESMANAGER')) {
            this.router.navigate(['/user-view']); 
          } else if (roles.includes('EXECUTIVE')) {
            this.router.navigate(['/executive']);
          } else {
            console.error('Rol no reconocido:', roles);
          }
        } else {
          console.error('No se encontró el token en sessionStorage');
        }
      }
}