import { Component, OnInit,OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from "rxjs/Observer";
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  numberObSubscription:Subscription;
  customObSubscription:Subscription;

  constructor() { }

  ngOnInit() {

    const myNumbers= Observable.interval(1000)
    .map(
      (data:number)=> {
        return data*2;
      }
    );
    this.numberObSubscription= myNumbers.subscribe(
      (myNumber: number)=>{
        console.log(myNumber);

      }
    );

    const myObservabe= Observable.create(
      (observer:Observer<string>)=>{
        setTimeout(()=>{
          observer.next('first package');
          }, 2000);

        setTimeout(()=>{
          observer.next('second package');
        }, 4000);

        setTimeout(()=>{
          observer.complete();
        }, 5000);

        setTimeout(()=>{
          observer.next('third package');
        }, 6000);
      });

   this.customObSubscription= myObservabe.subscribe(
      ( data: string)=>{console.log(data);},
      ( error: string)=>{console.log(error);},
      ( )=>{console.log('completed');},
    );

  }

  ngOnDestroy(){
    this.customObSubscription.unsubscribe();
    this.numberObSubscription.unsubscribe();
  }

}
