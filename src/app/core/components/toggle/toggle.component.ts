import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() label: string;
  @Input() enabled: boolean;
  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  processChange() {
    console.log(this.enabled);
    this.toggle.emit(this.enabled);
  }

}
