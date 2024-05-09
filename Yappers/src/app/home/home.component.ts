import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../core/models/message';
import { AuthService } from '../core/auth.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Group } from '../core/models/group';
import { GroupService } from '../core/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private hubConnectionBuilder!: HubConnection;
  selectedGroup?: Group;
  messages: Message[] = [];
  inputForm: UntypedFormGroup = new UntypedFormGroup({
    input: new UntypedFormControl('')
  });
  groupUpdateSubject: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5000/chat').build();
    this.hubConnectionBuilder.start().then(() => {
      console.log('Connection started...');
    }).catch(err => {
      this.snackBar.open("Couldn't connect to the server", 'CLOSE', {
        verticalPosition: 'top',
        duration: 3000
      });
    });
    this.hubConnectionBuilder.on('ReceiveMessage', (user: string, content: string) => {
      this.messages.push({ user, content });
    });
  }

  sendMessage(): void {
    const message = this.inputForm.controls['input'].value.trim();
    if (message.length > 0) {
      this.hubConnectionBuilder.invoke('SendGroupMessage', this.authService.getUsername(), message);
      this.inputForm.controls['input'].setValue('');
    }
  }

  onGroupSelect(group: Group): void {
    this.selectedGroup = group;
    this.groupService.getMessages(group.roomName).subscribe(messages => {
      this.messages = messages;
    });
    this.hubConnectionBuilder.invoke('JoinGroup', group.roomName);
  }

  deleteGroup(): void {
    if (this.selectedGroup) {
      const self = this;
      this.groupService.deleteGroup(this.selectedGroup.roomName).subscribe({
        error(err) {
          self.snackBar.open(`ERROR: ${err}`, 'CLOSE', {
            verticalPosition: 'top',
            duration: 3000
          });
        },
        complete() {
          self.snackBar.open('Group deleted', 'CLOSE', {
            verticalPosition: 'top',
            duration: 3000
          });
          self.groupUpdateSubject.next();
          self.selectedGroup = undefined;
        }
      });
    }
  }

}
