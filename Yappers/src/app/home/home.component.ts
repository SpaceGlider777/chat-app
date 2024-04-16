import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../core/models/message';
import { AuthService } from '../core/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private hubConnectionBuilder!: HubConnection;
  messages: Message[] = [];
  inputForm: FormGroup = new FormGroup({
    input: new FormControl('')
  });

  constructor(private authService: AuthService) { }

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
    const message = this.inputForm.controls['input'].value.trim();
    if (message.length > 0) {
      this.hubConnectionBuilder.invoke('SendMessage', this.authService.getUsername(), message);
      this.inputForm.controls['input'].setValue('');
    }
  }

}
