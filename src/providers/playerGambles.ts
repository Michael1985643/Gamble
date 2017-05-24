import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class playerGambles {
  af;
  public uid: string;

  constructor(af: AngularFire) {
    this.af = af;
  }

  getData(uid, round, callBack) {
    // this.af.database.list('/dnb/players/' + uid + '/' + round).subscribe(itemArray => {
    //    return "test";
    //}).toPromise();

    // const promise = this.af.database.list('/dnb/players/' + uid + '/' + round).remove();
    // promise.then(
    //     data => callBack(callBack(data))
    //   )
    //   .catch(err => console.log(err, 'You do not have access!'));


  }

}