import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor( private http: HttpClient) { }

   getBotResponse(req: any){
    return this.http.post<any>(
      'https://amnis-igcnx-dev.azurewebsites.net/chatApp',
      req
    )
  }
}
