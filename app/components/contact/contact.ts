import {Component} from 'angular2/core';

@Component({
    selector: 'contact',
    template: `<div class="contact">Contact Component 
               <br>
               <input type="text" style="color:black" placeholder="Type city name" [ngModel]="city"/> </div>`,
    styles: [`.contact {background: #286090; color: white; padding: 15px 0 0 30px;  height: 80px; width:100%;
                    float:left; box-sizing:border-box;}`]})
export class ContactComponent {
	city = "Warsaw";

}

@Component({
    selector: 'chat',
    template: `<textarea placeholder="Chat with customer service (Aux routing)"
                       class="chat"></textarea>`,
    styles: [`.chat {background: #eee; height: 80px;width:100%; 
                     float:left; display:block; box-sizing:border-box;} `]})
export class ChatComponent{
}