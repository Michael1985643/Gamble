import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

//services
import { TotoService } from '../../../services/toto-service';
import { UserService } from './../../../services/user-service';
/**
 * Generated class for the TotoOverview page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-toto-overview',
  templateUrl: 'toto-overview.html',
})
export class TotoOverview {
  @ViewChild('barCanvasAantalPunten') barCanvasAantalPunten;
  @ViewChild('barCanvasPrijzengeld') barCanvasPrijzengeld;
  barChartAantalPunten: any;
  barChartPrijzengeld: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public totoService: TotoService, public userService: UserService) {
  }

  ionViewDidLoad() {
    let totals: Array<string> = [];
    let labels: Array<string> = [];
    let colors: Array<string> = [];
    this.totoService.calculateToto(this.navParams.get('item').id).subscribe((toto ) => {
        this.userService.getAllPlayers(this.userService.user.subscription).subscribe((users ) => {
            users.forEach(user => {
                user["count"] = toto[user.$key]
            });                 
            let i=35;
            users.forEach(user => {
                totals.push(user["count"]);
                labels.push(user["nickName"]);
                colors.push(this.getColor(i));
                i = i + 35;
            });

            this.showGraph(totals, labels, colors);

        })
        
    })
   }

   showGraph(totals, labels, colors) {


       this.barChartAantalPunten = new Chart(this.barCanvasAantalPunten.nativeElement, {
 
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    data: totals,
                    backgroundColor: colors
                }]
            },
            options: {
                scales:{ 
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            max: 9
                        }
                    }]
                },
                 onClick: this.showDetails
            }
 
        });
   }

   getColor (c1) {
       let c2 = 50;
       let c3 = 50;
       let c4 = 1;

       let color = 'rgba('+c1+', '+c2+', '+c3+', '+c4+')'

       return color;
   }

   showDetails() {
    alert("michael");
   }

}
