import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './models/group';
import { environment } from 'src/environments/environment';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(environment.apiEndpoint + '/ConversationRoom');
  }

  getMessages(roomName: string): Observable<Message[]> {
    return this.http.get<Message[]>(environment.apiEndpoint + `/ConversationRoom/${roomName}/messages`);
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(environment.apiEndpoint + '/ConversationRoom', group);
  }

  deleteGroup(roomName: string): Observable<Group> {
    return this.http.delete<Group>(environment.apiEndpoint + `/ConversationRoom/${roomName}`);
  }
}
