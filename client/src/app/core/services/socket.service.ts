import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: WebSocket
  private listener: EventEmitter<any> = new EventEmitter()
  private selectedRoom!: string;

  constructor(private userService: UserService) { 
    this.socket = new WebSocket("ws://localhost:3000/ws")
    this.socket.onopen = event => {
      this.listener.emit({"type": "open", "data": event})
    }
    this.socket.onclose = event => {
      this.listener.emit({"type": "close", "data": event})
    }
    this.socket.onmessage = event => {
      this.listener.emit({"type": "message", "data": JSON.parse(event.data)})
    }
  }

  send(data: string) {
    this.socket.send(JSON.stringify({
      Sender: this.userService.user?.name,
      Room: this.selectedRoom.toString(),
      Content: data
    }))
  }

  close() {
    this.socket.close()
  }

  getEventListener() {
    return this.listener
  }

  getSelectedRoom() {
    return this.selectedRoom
  }

  setSelectedRoom(roomNumber: string) {
    this.selectedRoom = roomNumber
  }
}
