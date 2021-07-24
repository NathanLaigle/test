import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  private message: { type: string; message: string } = {
    type: '',
    message: '',
  };
  private messageSubject: BehaviorSubject<{ type: string; message: string }> =
    new BehaviorSubject(this.message);
  messageObs: Observable<{ type: string; message: string }> =
    this.messageSubject.asObservable();

  setMessage(message: { type: string; message: string }): void {
    this.messageSubject.next(message);
  }
}
