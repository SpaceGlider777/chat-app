import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  history: History = {}

  constructor() { }
  
}

type History = {
  [roomNumber: string]: string[]
}
