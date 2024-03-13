import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatHistoryService } from 'src/app/core/services/chat-history.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages!: string[]
  chatBox: string

  constructor(
    private socket: SocketService,
    private route: ActivatedRoute,
    private chatHistory: ChatHistoryService,
    private userService: UserService,
    private notificationService: NotificationService
    ) {
    this.chatBox = ""

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!
      this.socket.setSelectedRoom(id)

      // Create new array if no history exists
      if (!this.chatHistory.history[id]) {
        this.chatHistory.history[id] = []
      }

      this.messages = this.chatHistory.history[id]
    })
  }

  ngOnInit() {
    this.socket.getEventListener().subscribe(event => {
      if (event.type == "message") {
        let data = event.data.content

        // Attach sender to message
        if (event.data.sender) {
          data = event.data.sender + ": " + data
        }

        // Create new array if no history exists
        if (!this.chatHistory.history[event.data.room]) {
          this.chatHistory.history[event.data.room] = []
        }

        this.chatHistory.history[event.data.room].push(data)
      }
    })
  }

  ngOnDestroy() {
    this.socket.close()
  }

  send() {
    if (this.userService.user && this.chatBox) {
      this.socket.send(this.chatBox)
      this.chatBox = ""
    } else if (!this.userService.user && this.chatBox) {
      this.notificationService.notify('Please login to send messages.', 2, 2000)
    }
  }

  isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "<strong>" : message
  }

}
