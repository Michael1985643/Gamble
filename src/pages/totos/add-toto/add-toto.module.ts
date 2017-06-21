import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddToto } from './add-toto';

@NgModule({
  declarations: [
    AddToto,
  ],
  imports: [
    IonicPageModule.forChild(AddToto),
  ],
  exports: [
    AddToto
  ]
})
export class AddTotoModule {}
