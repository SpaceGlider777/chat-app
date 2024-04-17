import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './models/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(environment.apiEndpoint + "/ConversationRoom");
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(environment.apiEndpoint + "/ConversationRoom", group);
  }
}
