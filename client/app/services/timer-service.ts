import {Observable} from 'rxjs/Rx';

export class TimerObservableService{

    getTime(): Observable{

        return new Observable(
            observer => {
                  setInterval(() =>
                      observer.next(new Date())
                  , 1000);
            }
        );
    }
}