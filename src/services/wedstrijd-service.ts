import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

@Injectable()
export class WedstrijdService {

  constructor(public af: AngularFire) {
    console.log('Hello WedstrijdService Provider');
  }

  public getAll(): FirebaseListObservable<any[]> {
    return this.af.database.list('/data/wedstrijden').map(result => {
      var arr = [];
       for (var index = 0; index < result.length; index++) {
          arr.push(result[index]);
       }
       return arr;
    }) as FirebaseListObservable<any[]>;
   }

  public getWedstrijden(id, wedstrijdid): FirebaseListObservable<any[]> {
    return this.af.database.list('/data/' + id + '/' + wedstrijdid).map(result => {
      var arr = [];
       for (var index = 0; index < result.length; index++) {
          arr.push(result[index]);
       }
       return arr;
    }) as FirebaseListObservable<any[]>;
   }
}
