import { Special } from './../models/special.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

import { GambleBaseService } from '../services/gamble-base-service';

@Injectable()

export class SpecialService extends GambleBaseService{
 
   constructor(public af: AngularFire, public _auth: AuthService) {
     super(af, _auth);
     this.location = '/gambles/specials';
   }

   public getPlayerSpecial (id, uid): FirebaseObjectObservable<any[]> {
    return this.af.database.object('/'+  this._auth.userService.user["subscription"] +'/players/specials/' +  id + '/' + uid)
   }

   public setPlayerSpecial(id, uid, homeGoals, awayGoals, nickName): void {
    let path = this.af.database.object('/'+  this._auth.userService.user["subscription"] +'/players/specials/' +  id + '/' + uid);
    let item = {  
        nickName: nickName,
        homeGoals: parseInt(homeGoals) >= 0 ? parseInt(homeGoals) : "",
        awayGoals: parseInt(awayGoals) >= 0 ? parseInt(awayGoals) : ""
    }
    path.set(item); 
   }

   public getAllPlayerSpecials (id): FirebaseListObservable<any[]> {
      return this.af.database.list('/'+  this._auth.userService.user["subscription"] +'/players/specials/' + id);      
   }

  public add(special: Special) {
    let addItem = this.af.database.object(''+  this._auth.userService.user["subscription"] +'/gambles/specials/' + special.id);
    addItem.set(special);
  }
}
