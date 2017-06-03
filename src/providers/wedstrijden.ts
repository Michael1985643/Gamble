import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Wedstrijden provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Wedstrijden {

  constructor(public af: AngularFire) {
    console.log('Hello Wedstrijden Provider');
  }

  getWedstrijden() {
    // return this.af.database.list('/data/wedstrijden').forEach(itemArray => {
    //     return itemArray;
    // }).first()
  
    return this.af.database
    .list('/data/wedstrijden')
    .map(itemArray => {

      return itemArray;
    })
    .first()
    .toPromise();
    
  }
}
