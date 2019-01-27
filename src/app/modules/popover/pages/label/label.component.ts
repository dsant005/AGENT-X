import { Component, OnInit } from '@angular/core';
import { SelectorService } from '@app/core/services/selector.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(private selectorService: SelectorService) { }

  ngOnInit() {
  }

  startSelectorMode(type: string): void {
    this.selectorService.startLabelMode(type);
  }

}
