import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../core/models/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private hubConnectionBuilder!: HubConnection;
  messages: Message[] = [];
  input = '';

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5000/chat').build();
    this.hubConnectionBuilder.start().then(() => {
      console.log('Connection started...');
    }).catch(err => {
      console.log("Couldn't connect to the server.");
    });
    this.hubConnectionBuilder.on('ReceiveMessage', (user: string, content: string) => {
      this.messages.unshift({ user, content });
    });
  }

  sendMessage(): void {
    if (this.input.trim().length > 0) {
      this.hubConnectionBuilder.invoke('SendMessage', 'Bob', this.input);
      this.input = '';
    }
  }

}
