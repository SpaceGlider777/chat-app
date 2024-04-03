import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './models/message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(environment.apiEndpoint + "/chat", message);
  }
}
