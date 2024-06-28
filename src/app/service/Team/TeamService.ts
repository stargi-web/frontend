import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, pipe, tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class TeamService{
    private baseUrl='https://stargibackend.uc.r.appspot.com/api/v1/group';
    constructor(private http:HttpClient){}
    
    createGroup(name:string):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.post(`${this.baseUrl}`,{'teamName':name},{headers}).pipe(
            tap((response)=>{

            }),catchError(this.handleError)
        )
    }
    getAllTeams():Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }) 
      return this.http.get(`${this.baseUrl}`,{headers}).pipe(
        tap(response=>{
          
        }),catchError(this.handleError)
      )
    }
    
    modifyLeader(leaderId:number,teamId:number):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.put(`${this.baseUrl}/${leaderId}/leader/${teamId}/group`,null,{headers}).pipe(
            tap((response)=>{

            }),catchError(this.handleError)
        )
    }
    addMember(memberId:number,teamId:number):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.put(`${this.baseUrl}`,{'memberId':memberId,'groupId':teamId},{headers}).pipe(
            tap((response)=>{

            }),catchError(this.handleError)
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