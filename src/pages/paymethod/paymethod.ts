import { DetailPage } from '../detail/detail';
import { TransactionManager } from './../../providers/TransactionManager';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayMethod } from '../../classes/paymethod';
import {PayAmountPage} from '../payamount/payamount';

@Component({
  selector: 'page-paymethod',
  templateUrl: 'paymethod.html'
})

export class PayMethodPage {

  payMethods:PayMethod[] = [];
  total:number =0.00;
  currency:string = "";


  constructor( public navCtrl: NavController, public  navParams: NavParams, public transManager:TransactionManager)  {
  }


    loadGetData(){
      this.payMethods = this.transManager.get_PayMethods();
      //console.log("PayMethodPage.loadGetData.count: "+this.payMethods.length);
      this.total= this.navParams.get('total');
      this.currency = this.navParams.get('currency');
      this.transManager.set_transactionAmount(this.total, this.currency);
    }


    ionViewDidEnter() {
      console.log(">> PayMethodPage.ionViewDidEnter called");
      this.loadGetData();
  }


  itemTapped(event, item) {

    if(item.route){
      this.navCtrl.push(item.route ,{"total":this.total, "paymethod":item});
    }
    else{
      this.navCtrl.push(PayAmountPage ,{"total":this.total, "paymethod":item});
    }
    // That's right, we're pushing to ourselves!
    //this.navCtrl.push(PayMethodPage, {
      //item: item
    //});
  }
}
