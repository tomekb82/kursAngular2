import {Injectable} from 'angular2/core';
import {WebSocketService} from './websocket-service';
import {Observable, Subscriber} from 'rxjs/Rx';

@Injectable()
export class MessageService {
  constructor(private webSocket: WebSocketService) {}

  watchPhoto(photoId: number): Observable {
    let openSubscriber = Subscriber.create(
      () => this.webSocket.sendPhotoMessage({photoId: photoId}));

    return this.webSocket.createObservableSocketWithSubscriber('ws://localhost:8000', openSubscriber)
      .map(message => JSON.parse(message));
  }
}