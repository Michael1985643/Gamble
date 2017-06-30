import { WedstrijdService } from './wedstrijd-service';
import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import {Observable} from 'rxjs/Observable';
import { GambleBaseService } from './gamble-base-service';
import 'rxjs/add/operator/zip';

//models
import { Toto } from './../models/toto.model';

@Injectable()

export class TotoService extends GambleBaseService{
 
   constructor(public af: AngularFire, public _auth: AuthService, public userService: UserService, public wedstrijdService: WedstrijdService) {
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

  public getToto(id) {
    return this.af.database.list('/'+  this._auth.userService.user["subscription"] + '/players/totos/' + id).map((result) => {
       return result;
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

  public calculateToto(id): Observable<any> {
      return this.getToto(id).zip(this.wedstrijdService.getWedstrijden("wedstrijden", id)).map((result ) => {
        let totoPlayers = result[0]
        let wedstrijden = result[1];
        let TotoResult = {};
        for (var key in wedstrijden) {
          totoPlayers.forEach(perPlayer => {
              if (!TotoResult[perPlayer.$key]) {
                TotoResult[perPlayer.$key] = 0;
              }
              let playerToto = perPlayer[parseInt(key)]
              let actualToto = wedstrijden[key].toto
              //als er geen toto bestaat dan is de default 3
              if (!playerToto) {
                playerToto = 3
              }
              if (playerToto === actualToto) {
                TotoResult[perPlayer.$key] += 1
              }
          })
        }
        return TotoResult;
      })

  }


}
