import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';

import { ErrorComponent } from './components/error/error.component';
import { ModalComponent } from './components/modal/modal.component';
import { SmoothHeightComponent } from './components/smooth-height/smooth-height.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { CardComponent } from './components/card/card.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';

@NgModule({
  declarations: [
    ErrorComponent,
    ModalComponent,
    SmoothHeightComponent,
    ToggleComponent,
    CardComponent,
    TreeNodeComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    ErrorComponent,
    ModalComponent,
    SmoothHeightComponent,
    ToggleComponent,
    CardComponent,
    TreeNodeComponent,
  ]
})
export class CoreModule { }
