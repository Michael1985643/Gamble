import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class WedstrijdService {
  wedstrijden = [];

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
    }).publishReplay(1).refCount() as FirebaseListObservable<any[]>;
   }

  public getWedstrijden(id, wedstrijdid): FirebaseListObservable<any[]> {
    return this.getAll().map(result => {
      let wedstrijdenObj = {}
      let speelronde = result[wedstrijdid - 1];
      speelronde.forEach(wedstrijd => {
        wedstrijd["toto"] = this.calculateToto(wedstrijd.goalsHomeTeam, wedstrijd.goalsAwayTeam)
      });
      return speelronde
    }) as FirebaseListObservable<any[]>;
   }

   calculateToto (goalsHomeTeam, goalsAwayTeam) {
    let toto;
    if (goalsHomeTeam < goalsAwayTeam) {
      toto = 1;
    }
    if (goalsHomeTeam > goalsAwayTeam) {
      toto = 2;
    }
    if (goalsHomeTeam == goalsAwayTeam) {
      toto = 3;
    }   
    return toto;
   }
}
