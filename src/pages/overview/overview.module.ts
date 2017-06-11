import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Overview } from './overview';

@NgModule({
  declarations: [
    Overview,
  ],
  imports: [
    IonicPageModule.forChild(Overview),
  ],
  exports: [
    Overview
  ]
})
export class OverviewModule {}
