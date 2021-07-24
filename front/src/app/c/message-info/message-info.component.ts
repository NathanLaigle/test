import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/s/message.service';

@Component({
  selector: 'app-message-info',
  templateUrl: './message-info.component.html',
  styleUrls: ['./message-info.component.scss'],
})
export class MessageInfoComponent implements OnInit {
  constructor(private _msg: MessageService) {}

  message: { type: string; message: string };

  messageDuration: number = 8000;

  ngOnInit(): void {
    this._msg.messageObs.subscribe((data) => {
      this.message = data;
      if (data.message) {
        setTimeout(() => {
          this.message = { type: null, message: null };
        }, this.messageDuration);
      }
    });
  }

  onCloseMessageBox(): void {
    this.message = { type: null, message: null };
  }
}
