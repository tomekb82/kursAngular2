import {Component, ViewChild, AfterViewInit} from 'angular2/core';

@Component({
    selector: 'hobby',
    template: `<h3>Hobby</h3>  {{name}}`

})
class Hobby {
	name:string;
	tmpName:string;
    show(name) {
        console.log(`Hello from ${name}.`);
        this.tmpName = name;
    }

    ngOnChanges() {
    	this.name = this.tmpName;
    	console.log("hobby name" + this.name);
    }
}

@Component({
    selector: 'about',
    template: `<h1>About Component</h1>
    (exposing child api)
    <hobby #hobby1></hobby>
    <hobby #hobby2></hobby>

    <button (click)="hobby2.show('Hobby 2')">Invoke show() on hobby 2</button>`,
    directives: [Hobby]
})
export class AboutComponent implements AfterViewInit{

	@ViewChild('hobby1')
    firstHobby: Hobby;

    ngAfterViewInit() {
        this.firstHobby.show('Hobby 1');
    }
}
