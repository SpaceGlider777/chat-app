import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() user?: string;
  @Input() content?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
