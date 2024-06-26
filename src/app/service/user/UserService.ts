import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { CreateUserModel } from "../../user/model/CreateUserModel";
import { response } from "express";

@Injectable({
    providedIn:'root',
})
export class UserService{
    private baseUrl='http://localhost:8080/api/v1/user';
    constructor(private http:HttpClient){
      
    }
    isUserLeader(userId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      return this.http.get(`${this.baseUrl}/${userId}/isLeader`,{headers}).pipe(
        tap((response)=>{
          console.log(response);
        }),catchError(this.handleError)
      )
    }
    getUserByTeam(teamId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.baseUrl}/${teamId}/group`,{headers}).pipe(
        tap((response)=>{

        }),catchError(this.handleError)
      )
    }
    getUserByRol(rol:string):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.baseUrl}/${rol}/role`,{headers}).pipe(
        tap(response=>{

        }),catchError(this.handleError)
      )  
    }
    getAllUsers():Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.get(`${this.baseUrl}`,{headers}).pipe(
            tap((response)=>{
                console.log();
            }
        ),catchError(this.handleError)
        )
    }
    deleteUser(userId:Number):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this.http.delete(`${this.baseUrl}/${userId}`).pipe(
        tap((response)=>{
          console.log(response);
        }
      ),catchError(this.handleError)
      )
    }
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      }

}