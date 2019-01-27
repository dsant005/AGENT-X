import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';

import { ErrorComponent } from './components/error/error.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ErrorComponent, ModalComponent],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [ErrorComponent, ModalComponent]
})
export class CoreModule { }
