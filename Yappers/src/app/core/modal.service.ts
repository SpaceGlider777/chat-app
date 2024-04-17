import { ComponentRef, EnvironmentInjector, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalComponent!: ComponentRef<ModalComponent>; 

  constructor(private injector: EnvironmentInjector) { }

  open(vcr: ViewContainerRef, content: TemplateRef<Element>): void {
    vcr.clear();
    const innerContent = vcr.createEmbeddedView(content);

    this.modalComponent = vcr.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes]
    });
  }
}
