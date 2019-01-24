import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyzeComponent } from '@app/modules/popover/pages/analyze/analyze.component';
import { SettingsComponent } from '@app/modules/popover/pages/settings/settings.component';
import { LabelComponent } from '@app/modules/popover/pages/label/label.component';


const appRoutes: Routes = [
  { path: '', component: AnalyzeComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'label',      component: LabelComponent },
  { path: '**', component: AnalyzeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
