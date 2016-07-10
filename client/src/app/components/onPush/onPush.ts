import { Component, Input, ChangeDetectionStrategy, AfterViewChecked} from 'angular2/core';

@Component({
  selector: 'grand-child',
  styles: ['.grand-child{background:yellow}'],
  template: `
    <div class="grand-child">
      <h3>Grand Child</h3>
      <div>Got from child: {{grandChildReceived}}</div>
    </div>`
})
class GrandChildComponent implements AfterViewChecked{
  @Input() grandChildReceived: string;

  ngAfterViewChecked(){
    console.log('GrandChild: in ngAfterViewChecked');
  }
}

@Component({
  selector: 'child',
  styles: ['.child{background:lightgreen}'],
  directives: [GrandChildComponent],
  template: `
     <div class="child">
      <h2>Child</h2>
      <div>Greeting: {{greeting}}</div>
      <div>User name: {{user.name}}</div>
      <div>Message: <input [(ngModel)]="message"></div>
      <grand-child [grandChildReceived]="message"></grand-child>
    </div>`
    ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ChildComponent implements AfterViewChecked{
  @Input() greeting: string;
  @Input() user: {name: string};
  message: string = 'Initial message';

  ngAfterViewChecked() {
    console.log("Child: in ngAfterViewChecked");
  }
}

@Component({
  selector: 'on-push',
  directives: [ChildComponent],
  styles: ['.parent {background: lightblue}'],
  template: `
     <div class="parent">
       <h2>Parent</h2>
      <div>Greeting: <input type="text" [value]="greeting" (change)="greeting = $event.target.value"></div>
      <div>User name: <input type="text" [value]="user.name" (change)="user.name = $event.target.value"></div>
      <child [greeting]="greeting" [user]="user"></child>
    </div>`
})
export default class OnPushComponent implements AfterViewChecked{
  greeting: string = 'Hello';
  user: {name: string} = {name: 'John'};

  ngAfterViewChecked() {
    console.log("Parent: in ngAfterViewChecked");
  }
}
