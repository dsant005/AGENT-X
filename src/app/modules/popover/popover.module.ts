import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';

import { AnalyzeComponent } from '@app/modules/popover/pages/analyze/analyze.component';
import { SettingsComponent } from '@app/modules/popover/pages/settings/settings.component';
import { LabelComponent } from '@app/modules/popover/pages/label/label.component';
import { CoreModule } from '@app/core/core.module';
import { OverlayToggleComponent } from './components/overlay-toggle/overlay-toggle.component';
import { PageAnalysisTreeComponent } from './components/page-analysis-tree/page-analysis-tree.component';

@NgModule({
  declarations: [
    AnalyzeComponent,
    SettingsComponent,
    LabelComponent,
    OverlayToggleComponent,
    PageAnalysisTreeComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  exports: [
    OverlayToggleComponent
  ]
})
export class PopoverModule { }
