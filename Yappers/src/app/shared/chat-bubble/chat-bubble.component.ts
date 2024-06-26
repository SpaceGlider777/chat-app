import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/message';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() message?: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
