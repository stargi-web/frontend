import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
@Injectable({
    providedIn:'root',
})
export class ClientCollectionService{
    private baseUrl="https://stargibackend.uc.r.appspot.com/api/v1/clientCollection";

    constructor(private httpClient:HttpClient){

    }

    getCollectionsByUserId(userId:number):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.httpClient.get(`${this.baseUrl}/${userId}/user`,{headers}).pipe(
            tap((response)=>{
                
            }),catchError(this.handleError)
        )

    }
    ifCollectionHasClient(collectionId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.httpClient.get(`${this.baseUrl}/${collectionId}/has-clients`,{headers}).pipe(
          tap((response)=>{
              
          }),catchError(this.handleError)
      )
    }

    createCollection(body:any){
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.httpClient.post(`${this.baseUrl}`,body,{headers}).pipe(
            tap((response)=>{})
            ,catchError(this.handleError)
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