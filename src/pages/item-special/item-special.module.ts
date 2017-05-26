import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSpecial } from './item-special';

@NgModule({
  declarations: [
    ItemSpecial,
  ],
  imports: [
    IonicPageModule.forChild(ItemSpecial),
  ],
  exports: [
    ItemSpecial
  ]
})
export class ItemSpecialModule {}
