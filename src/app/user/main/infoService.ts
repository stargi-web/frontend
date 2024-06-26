import { Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse,HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateInfoModel } from "../saved/model/CreateInfoModel";
import { EditInfoModel } from "../model/EditInfoModel";



@Injectable({
    providedIn:'root',
})
export class InfoService{
    private baseUrl = 'http://localhost:8080/api/v1/info';
    constructor(private http:HttpClient){}

    createInfo(body:CreateInfoModel):Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.post<any>(this.baseUrl,body,{headers}).pipe(
            tap((response)=>console.log("Registro de información exitoso!")),
            catchError(this.handleError)
        )        
    }
    getInfoByTeam(teamId:number){
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<any>(`${this.baseUrl}/${teamId}/infosTeam`,{headers}).pipe(
        tap((response)=>console.log("Obtención de Infos por team exitosa")),catchError(this.handleError))

    }
    deleteInfo(infoId:Number):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this.http.delete(`${this.baseUrl}/${infoId}`,{headers}).pipe(
        tap((response)=>console.log(response)),
        catchError(this.handleError)
      )
    }
    getAllInfos():Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      
        return this.http.get<any>(this.baseUrl,{headers})
        .pipe(tap((response)=>console.log("Obtención de Infos exitosa")),catchError(this.handleError))
    }
    getInfo(userId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      const url=`${this.baseUrl}/${userId}/infosUser`
        return this.http.get<any>(url,{headers})
        .pipe(tap((response)=>console.log("Obtención de Infos exitosa")),catchError(this.handleError))
    }
    editInfo(infoId:number,body:EditInfoModel):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      
      const url=`${this.baseUrl}/edit/${infoId}`;
      return this.http.put<any>(url,body,{headers}).pipe(
        tap((response)=>console.log("Registro editado exitosamente")),
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
