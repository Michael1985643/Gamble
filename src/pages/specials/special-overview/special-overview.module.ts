import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialOverview } from './special-overview';

@NgModule({
  declarations: [
    SpecialOverview,
  ],
  imports: [
    IonicPageModule.forChild(SpecialOverview),
  ],
  exports: [
    SpecialOverview
  ]
})
export class SpecialOverviewModule {}
