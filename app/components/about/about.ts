import {Component, ViewChild, AfterViewInit, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'hobby',
    styles: ['.child {background: lightgreen;}'],
    template: `<h2> Hobby - {{name}}</h2>
                <div>This &lt;div&gt; is defined in the child's template</div>
                <div class="child">
                  <!--<ng-content></ng-content>-->
                  <ng-content select=".header"></ng-content>
                  <div>This content is defined in child</div>
                  <ng-content select=".footer"></ng-content>
               </div>`,
  encapsulation: ViewEncapsulation.Native 

})
class Hobby {
    childProperty: string = 'value';
    show(name) {
        console.log(`Hello from ${name}.`);
        this.name = name;
    }
}

@Component({
    selector: 'about',
    styles: ['.about {background: cyan;}'],
    template: `<h1>About Component</h1>
    (exposing child api/ng-content-binding)
    <div class="about">
        <div>This &lt;div&gt; is defined in the Parent's template</div>
        <hobby #hobby1>
            <div class="header">Child got this header from parent {{todaysDate}}</div>
            <div class="footer">Child got this footer from parent
                <div> - Parent's property: {{parentProperty}}</div>
                <div> - Child's property: {{childProperty}}</div>
            </div>    
        </hobby>
        <hobby #hobby2></hobby>

        <button (click)="hobby2.show('Hobby 2')">Invoke show() on hobby 2</button>
    </div>`,
    encapsulation: ViewEncapsulation.Native
    directives: [Hobby]
})
export class AboutComponent implements AfterViewInit{

    parentProperty: string = 'value';
    todaysDate: string = new Date().toLocaleDateString();

	@ViewChild('hobby1')
    firstHobby: Hobby;

    ngAfterViewInit() {
        this.firstHobby.show('Hobby 1');
    }
}
