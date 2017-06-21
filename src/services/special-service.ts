import { Special } from './../models/special.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { GambleBaseService } from '../services/gamble-base-service';

@Injectable()

export class SpecialService extends GambleBaseService{
 
   constructor(public af: AngularFire) {
     super(af);
     this.location = '/dnb/gambles/specials';
   }

   public getPlayerSpecial (id, uid): FirebaseObjectObservable<any[]> {
    return this.af.database.object('/dnb/players/specials/' +  id + '/' + uid)
   }

   public setPlayerSpecial(id, uid, homeGoals, awayGoals): void {
    let path = this.af.database.object('/dnb/players/specials/' +  id + '/' + uid);
    let item = {  
        homeGoals: parseInt(homeGoals) >= 0 ? parseInt(homeGoals) : "",
        awayGoals: parseInt(awayGoals) >= 0 ? parseInt(awayGoals) : ""
    }
    path.set(item); 
   }

   public getAllPlayerSpecials (id): FirebaseListObservable<any[]> {
      return this.af.database.list('/dnb/players/specials/' + id);      
   }

  public add(special: Special) {
    let addItem = this.af.database.object('dnb/gambles/specials/' + special.id);
    addItem.set(special);
  }
}
