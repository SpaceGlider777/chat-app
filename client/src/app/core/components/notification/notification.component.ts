import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @ViewChild('notificationContainer') notificationContainer!: ElementRef<HTMLDivElement>

  constructor(public notificationService: NotificationService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(notification => {
      if (notification) {
        this.render(notification)
      }
    })
  }

  render(notification: any) {
    const innerContainer = this.renderer.createElement('div')
    const content = this.renderer.createElement('div')
    const contentText = this.renderer.createText(notification.message)

    switch (notification.type) {
      case 0:
        this.renderer.setStyle(innerContainer, 'background', '#03ab68')
        break
      case 1:
        this.renderer.setStyle(innerContainer, 'background', '#f7c707')
        break
      case 2:
        this.renderer.setStyle(innerContainer, 'background', '#f55656')
        break
    }
    this.renderer.setStyle(innerContainer, 'width', '100%')
    this.renderer.setStyle(innerContainer, 'height', '100%')
    this.renderer.setStyle(innerContainer, 'padding', '1rem')
    this.renderer.setStyle(innerContainer, 'border-radius', '3px')
    this.renderer.setStyle(innerContainer, 'margin-bottom', '1rem')
    this.renderer.setStyle(content, 'font-weight', 'bold')
    this.renderer.appendChild(content, contentText)
    this.renderer.appendChild(innerContainer, content)
    this.renderer.appendChild(this.notificationContainer.nativeElement, innerContainer)

    setTimeout(() => {
      this.renderer.removeChild(this.notificationContainer.nativeElement, innerContainer)
    }, notification.duration)
  }

}
