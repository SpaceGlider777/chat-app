import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        top: '1rem',
        opacity: 1
      })),
      state('closed', style({
        top: 0,
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  @Input() message!: string;
  @Input() delay?: number;
  @ViewChild('snackbar') snackbar!: ElementRef;
  isOpen = false;

  constructor() { }

  ngOnInit(): void { }

  show(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    setTimeout(() => {
      this.isOpen = false;
    }, this.delay ?? 3000);
  }
}
