import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemToto } from './itemToto';

@NgModule({
  declarations: [
    ItemToto,
  ],
  imports: [
    IonicPageModule.forChild(ItemToto),
  ],
  exports: [
    ItemToto
  ]
})
export class ItemModule {}
