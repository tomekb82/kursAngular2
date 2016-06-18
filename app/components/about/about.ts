import {Component, ViewChild, AfterViewInit, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'hobby',
    styles: ['.child {background: lightgreen;}'],
    template: `<h2> Hobbby </h2>
                <div>This &lt;div&gt; is defined in the child's template</div>
                <div class="child">
                  <ng-content></ng-content>
               </div>`,
  encapsulation: ViewEncapsulation.Native 

})
class Hobby {
    childProperty: string = 'value';
    show(name) {
        console.log(`Hello from ${name}.`);
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
            <div>Parent projects this &lt;div&gt; onto the child </div>
            <div>Parent's property: {{parentProperty}}</div>
            <div>Child's property: {{childProperty}}</div>
        </hobby>
        <hobby #hobby2></hobby>

        <button (click)="hobby2.show('Hobby 2')">Invoke show() on hobby 2</button>
    </div>`,
    encapsulation: ViewEncapsulation.Native
    directives: [Hobby]
})
export class AboutComponent implements AfterViewInit{

    parentProperty: string = 'value';

	@ViewChild('hobby1')
    firstHobby: Hobby;

    ngAfterViewInit() {
        this.firstHobby.show('Hobby 1');
    }
}
