import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { App } from 'src/app/i/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss'],
})
export class AppDetailsComponent implements OnInit {
  constructor() {}

  @Input() app: App;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  apiUrl: string = environment.apiUrl;

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
