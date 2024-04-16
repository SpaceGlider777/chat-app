import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    ChatBubbleComponent,
    NavbarComponent,
    SnackbarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ChatBubbleComponent,
    NavbarComponent,
    SnackbarComponent
  ]
})
export class SharedModule { }
