import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import moment from 'moment';

/*
  Generated class for the Totos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Totos {
  items = [];
  openItems = [];
  closedItems = [];

  constructor(public af: AngularFire) {
      this.af.database.list('/dnb/gambles/totos').subscribe(result => {
        for (var index = 0; index < result.length; index++) {
          if (moment() < moment(result[index].closedForGamble))  {
            this.openItems.push(result[index])    
          }
          if (moment() >= moment(result[index].closedForGamble))  {
            this.closedItems.push(result[index])    
          }
          this.items.push(result[index]);
        }
     });    
  }

  getTotos(): Array<string> {
    return this.items;
  }

  getOpenTotos(): Array<string> {
    return this.openItems;
  }

  getClosedTotos(): Array<string> {
    return this.closedItems;
  }
}
