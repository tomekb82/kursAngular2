import {MessageService} from './message-service';
import {PhotoService} from './photo-service';
import {WebSocketService} from './websocket-service';
import {TimerObservableService} from './timer-service';
import {ValidationService} from './validation-service';

export const PHOTO_APP_SERVICES = [
  MessageService,
  PhotoService,
  WebSocketService,
  TimerObservableService,
  ValidationService
];