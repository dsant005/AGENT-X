import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';

import { AnalyzeComponent } from '@app/modules/popover/pages/analyze/analyze.component';
import { SettingsComponent } from '@app/modules/popover/pages/settings/settings.component';
import { LabelComponent } from '@app/modules/popover/pages/label/label.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [
    AnalyzeComponent,
    SettingsComponent,
    LabelComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule
  ]
})
export class PopoverModule { }
