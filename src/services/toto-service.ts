import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { GambleBaseService } from './gamble-base-service';

//models
import { Toto } from './../models/toto.model';

@Injectable()

export class TotoService extends GambleBaseService{
 
   constructor(public af: AngularFire) {
     super(af);
     this.location = '/dnb/gambles/totos';
   }

  public getPlayerGamble(id:Toto, uid:Toto): FirebaseListObservable<any[]> {
    return this.af.database.list('/dnb/players/totos/' + id + '/' + uid).map((result) => {
      var arr = [];
       for (var index = 0; index < result.length; index++) {
          arr.push(result[index]);
       }

       return arr;
    }) as FirebaseListObservable<any[]>;
  }

  public removePlayerToto(id, uid, wid) {
    let value = this.af.database.object('/dnb/players/totos/' + id + '/' + uid + '/' + wid);
    value.remove()
  }

  public setPlayerToto(id, uid, wid, teamName) {
    let value = this.af.database.object('/dnb/players/totos/' + id + '/' + uid + '/' + wid);
    value.set(teamName);
  }

  public add(toto: Toto) {
    let addItem = this.af.database.object('dnb/gambles/totos/' + toto.id);
    addItem.set(toto);
  }

}
