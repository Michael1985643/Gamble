import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

import { GambleBaseService } from './gamble-base-service';

//models
import { Toto } from './../models/toto.model';

@Injectable()

export class TotoService extends GambleBaseService{
 
   constructor(public af: AngularFire, public _auth: AuthService) {
     super(af, _auth);
     this.location = '/gambles/totos';
   }

  public getPlayerGamble(id:Toto, uid:Toto): FirebaseListObservable<any[]> {
    return this.af.database.list('/'+  this._auth.userService.user["subscription"] + '/players/totos/' + id + '/' + uid).map((result) => {
      var arr = [];
       for (var index = 0; index < result.length; index++) {
          arr.push(result[index]);
       }

       return arr;
    }) as FirebaseListObservable<any[]>;
  }

  public removePlayerToto(id, uid, wid) {
    let value = this.af.database.object('/'+  this._auth.userService.user["subscription"] +  '/players/totos/' + id + '/' + uid + '/' + wid);
    value.remove()
  }

  public setPlayerToto(id, uid, wid, teamName) {
    let value = this.af.database.object('/'+  this._auth.userService.user["subscription"] + '/players/totos/' + id + '/' + uid + '/' + wid);
    value.set(teamName);
  }

  public add(toto: Toto) {
    let addItem = this.af.database.object('/'+  this._auth.userService.user["subscription"] +  '/gambles/totos/' + toto.id);
    addItem.set(toto);
  }

}
