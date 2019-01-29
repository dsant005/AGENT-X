import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyzeComponent } from '@app/modules/popover/pages/analyze/analyze.component';
import { SettingsComponent } from '@app/modules/popover/pages/settings/settings.component';
import { LabelComponent } from '@app/modules/popover/pages/label/label.component';


const appRoutes: Routes = [
  { path: '', component: AnalyzeComponent, data: {animation: 'Analysis'} },
  { path: 'settings',      component: SettingsComponent, data: {animation: 'Settings'} },
  { path: 'label',      component: LabelComponent, data: {animation: 'Label'} },
  { path: '**', component: AnalyzeComponent, data: {animation: 'Error'} }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
