import {Component} from 'angular2/core';
import 'rxjs/add/operator/map';
import {TimerObservableService} from "../../../services/timer-service";

@Component({
  selector: 'timer',
  providers: [ TimerObservableService ],
  template: `Current time: {{currentTime | date: 'jms'}}
  `,
  styles: ['color:#9D9D9D !important;']
  })
export default class TimerComponent {

  currentTime: Date;

  constructor(private timerService: TimerObservableService) {
  	this.timerService.getTime()
    	.subscribe( data => this.currentTime = data );
  }
}