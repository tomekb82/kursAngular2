import {Component} from 'angular2/core';

@Component({
    selector: 'contact',
    template: `<div class="contact">Contact Component 
    		   <br>
               <input type="text" style="color:black" placeholder="Type something here" [ngModel]="description"/> </div>`,
    styles: [`.contact {background: #286090; color: white; padding: 15px 0 0 30px;  height: 80px; width:70%;
                    float:left; box-sizing:border-box;}`]})
	
export class ContactComponent {

	description = "my description";

}

@Component({
    selector: 'chat',
    template: `<textarea placeholder="Chat with customer service"
                       class="chat"></textarea>`,
    styles: [`.chat {background: #eee; height: 80px;width:30%; 
                     float:left; display:block; box-sizing:border-box;} `]})
export class ChatComponent{

	
}