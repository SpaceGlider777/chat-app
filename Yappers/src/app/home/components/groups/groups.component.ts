import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGroupDialogComponent } from '../new-group-dialog/new-group-dialog.component';
import { GroupService } from 'src/app/core/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/core/models/group';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @Input() groupUpdateEvent!: Observable<void>;
  @Output() groupSelect = new EventEmitter<Group>();
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  groups: Group[] = [];
  selectedGroup?: Group;

  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.updateGroups();
    this.groupUpdateEvent.subscribe(() => {
      this.updateGroups();
    });
  }

  updateGroups(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  openNewGroupDialog(): void {
    const self = this;
    const dialogRef = this.dialog.open(NewGroupDialogComponent);
    dialogRef.afterClosed().subscribe(roomName => {
      if (roomName) {
        this.groupService.addGroup({ roomName: roomName }).subscribe({
          complete() {
            self.snackBar.open('Group created', 'CLOSE', {
              verticalPosition: 'top',
              duration: 3000
            });
            self.updateGroups();
          },
          error(err) {
            self.snackBar.open(err.message, 'CLOSE', {
              verticalPosition: 'top',
              duration: 3000
            });
          },
        });
      }
    });
  }

  openGroupOptions(): void {
    this.trigger.openMenu();
  }

  onGroupSelect(group: Group): void {
    this.selectedGroup = group;
    this.groupSelect.emit(group);
  }

}
