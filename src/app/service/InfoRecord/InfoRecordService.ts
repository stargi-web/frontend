import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, pipe, tap, throwError } from "rxjs";
@Injectable({
    providedIn:'root',
})
export class InfoRecordService{
    private baseUrl='http://localhost:8080/api/v1/infoRecord';

    constructor(private http:HttpClient){
      
    }

    getRecord(infoId:number):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.get(`${this.baseUrl}/${infoId}`,{headers}).pipe(
            tap((response)=>{console.log("Obtención de records exitoso")}),
            catchError(this.handleError)
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