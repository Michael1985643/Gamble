import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { GambleBaseService } from './gamble-base-service';

@Injectable()

export class TotoService extends GambleBaseService{
 
   constructor(public af: AngularFire) {
     super(af);
     this.location = '/dnb/gambles/totos';
   }
}
