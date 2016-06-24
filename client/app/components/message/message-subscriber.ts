import {Component} from 'angular2/core';
import 'rxjs/add/operator/map';
import {MessageService} from "../../services/message-service";
import {Message} from "./message";

@Component({
  selector: 'message-subscriber',
  providers: [ MessageService ],
  template: `<h3>Websocket communication with server</h3>
             <h4> Message status: {{status}}</h4>

              <form #f="ngForm" (ngSubmit) = "sendMessageToServer(f.value)" >
                <label for="inputMessage">Enter message</label>
                <input id="inputMessage" type="text" ngControl="inputMessage">
                <button type="submit">Send msg to Server</button>
              </form>
           
              <button (click)="toggleMessageSubscription()">Toggle subscription to message notifications</button><br>
              Last message: {{newMessage?.message}} <br>
              Send time: {{newMessage?.sendDate | date: 'medium'}}
  `})
export default class MessageSubscriberComponent {

  newMessage: Message;
  subscribeToNotifications:boolean = false;
  status: string = "unsubscribed";

  messageFromServer: string;

  constructor(private wsService: MessageService) {
    this.wsService.createObservableSocket("ws://localhost:8085")
      .map(res => JSON.parse(res))
      .subscribe(
        data => {
          this.newMessage = data;
          this.newMessage.sendDate= Date.parse(data.sendDate);
          console.log(this.newMessage);
        },
        err => console.log( err),
        () =>  console.log( 'The message stream is complete')
      );
  }

  toggleMessageSubscription(){
    this.subscribeToNotifications = !this.subscribeToNotifications;
    this.wsService.subscribeToMessages(this.subscribeToNotifications);
    this.status =  this.subscribeToNotifications ? "subscribed": "unsubscribed";

  }

  sendMessageToServer(formValue){
        console.log("Sending message '" + formValue.inputMessage + "' to WebSocket server");
        this.wsService.sendMessage(formValue.inputMessage);
    }
}

