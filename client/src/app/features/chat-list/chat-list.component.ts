import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatHistoryService } from 'src/app/core/services/chat-history.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  constructor(private router: Router, public socket: SocketService, public chatHistory: ChatHistoryService) { }

  ngOnInit(): void {
  }

  changeRoom(roomNumber: string) {
    if (this.socket.getSelectedRoom() == roomNumber) {
      return
    }
    
    this.socket.setSelectedRoom(roomNumber)
    this.router.navigate([`room/${roomNumber}`])
  }

}
