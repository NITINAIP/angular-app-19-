import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { User } from '@model/user';

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private httpClient: HttpClient) { }

    get(){
        return this.httpClient.get<User[]>(`${environment.API_URL}/user`)
    }

    findById(id:string){
        return this.httpClient.get<User>(`${environment.API_URL}/user/${id}`)
    }
    create(payload:User){
        return this.httpClient.post<User>(`${environment.API_URL}/user`,payload)
    }
    update(payload:User,id:string){
        return this.httpClient.put<User>(`${environment.API_URL}/user/${id}`,payload)
    }
    delete(id:string){
        return this.httpClient.delete(`${environment.API_URL}/user/${id}`)
    }
    
}