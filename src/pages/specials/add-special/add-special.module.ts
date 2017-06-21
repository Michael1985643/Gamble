import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSpecial } from './add-special';

@NgModule({
  declarations: [
    AddSpecial,
  ],
  imports: [
    IonicPageModule.forChild(AddSpecial),
  ],
  exports: [
    AddSpecial
  ]
})
export class AddSpecialModule {}
