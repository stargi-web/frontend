import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
@Injectable({
    providedIn:'root',
})
export class ClientService{
    private baseUrl='http://localhost:8080/api/v1/client';

    constructor(private http:HttpClient){
      
    }

    getAllClients():Observable<any>{
        const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.get(this.baseUrl,{headers}).pipe(
            tap((_response)=>{console.log("Obtenido")},
        catchError(this.handleError))
        )
    }
    getCollectionsNameByUserId(userId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return this.http.get(`${this.baseUrl}/${userId}/user/collection`,{headers}).pipe(
          tap((response)=>{}),catchError(this.handleError)
        )
    }
    getClientsByUserAndCollection(userId:number,collectionId:number):Observable<any>{
      const token=sessionStorage.getItem("token");
        const headers=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        console.log("User: ",userId,"Collection: ",collectionId)
        return this .http.get(`${this.baseUrl}/${userId}/user/${collectionId}/collection`,{headers}).pipe(
          tap((response)=>{}),catchError(this.handleError)
        )
        
    }
    getClientsByCollectionPaged(collectionId:number,page:number,size:number,sortBy:string):Observable<any>{
      const token=sessionStorage.getItem("token");
      const headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this.http.get(`${this.baseUrl}/${collectionId}/collection?page=${page}&size=${size}&sortBy=${sortBy}`,{headers}).pipe(
        tap((response)=>{console.log(response)}),catchError(this.handleError)
      ) 
    }
    createClients(jsonFile:File,collectionId:number):Observable<any>{
      const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData: FormData = new FormData();
    formData.append('jsonFile', jsonFile);
    formData.append('collectionId', collectionId.toString());

    return this.http.post(this.baseUrl, formData, { headers }).pipe(
      tap((response) => {
        console.log('Clientes creado exitosamente');
      }),
      catchError(this.handleError)
    );
    }
    assigClientToUser(clientId:number,userId:number):Observable<any>{
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.baseUrl}/${userId}/user/${clientId}/client`,null,{headers}).pipe(
        tap((response) => {

        }),
        catchError(this.handleError)
      );
    }
    modifyClient(body:any){
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.baseUrl}/edit`,body,{headers}).pipe(
        tap((response) => {

        }),
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