import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: Subject<any> = new BehaviorSubject(null);

  constructor() { }

  notify(message: string, type: MessageType, duration: number) {
    console.log("NOTIFY")
    this.notification.next({
      message: message,
      type: type,
      duration: duration
    })
  }

  getNotification() {
    return this.notification
  }
}

export enum MessageType {
  Success,
  Warning,
  Error
}
