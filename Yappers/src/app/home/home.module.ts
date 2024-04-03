import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './components/groups/groups.component';



@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GroupsComponent
  ]
})
export class HomeModule { }
