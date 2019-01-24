import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClarityModule } from '@clr/angular';

import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientModule
  ],
  exports: [ErrorComponent]
})
export class CoreModule { }
