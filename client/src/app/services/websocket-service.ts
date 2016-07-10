import {Injectable} from 'angular2/core';
import {Observable, Subscriber} from 'rxjs/Rx';


@Injectable()
export class WebSocketService {
  private ws: WebSocket;

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
      return () => this.ws.close();
    });
  }

  createObservableSocketWithSubscriber(url: string, openSubscriber: Subscriber): Observable {
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
      this.ws.onopen = event => {
        openSubscriber.next();
        openSubscriber.complete();
      };

      return () => this.ws.close();
    });
  }

  subscribeToMessages(subscribe: boolean){
    let action = subscribe? 'subscribe': 'unsubscribe';
    this.ws.send(action);
  }

  sendInputMessage(message: any){
    this.ws.send(message);
  }

  sendPhotoMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}