import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ChatBubbleComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ChatBubbleComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
