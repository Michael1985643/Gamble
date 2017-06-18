import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { GambleBaseService } from '../services/gamble-base-service';

@Injectable()

export class SpecialService extends GambleBaseService{
 
   constructor(public af: AngularFire) {
     super(af);
     this.location = '/dnb/gambles/specials';
   }
}
