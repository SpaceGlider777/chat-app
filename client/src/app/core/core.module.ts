import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryService } from './services/chat-history.service';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationComponent
  ],
  providers: [
    ChatHistoryService,
    SocketService,
    UserService,
    NotificationService
  ]
})
export class CoreModule { }
