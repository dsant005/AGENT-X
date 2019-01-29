import { Component, OnInit, Input } from '@angular/core';

import { Analysis } from '@app/core/models/analysis.interface';

@Component({
  selector: 'app-page-analysis-tree',
  templateUrl: './page-analysis-tree.component.html',
  styleUrls: ['./page-analysis-tree.component.scss']
})
export class PageAnalysisTreeComponent implements OnInit {
  @Input() analysis: Analysis;

  constructor() { }

  ngOnInit() {
  }

}
