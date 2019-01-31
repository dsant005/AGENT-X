import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('ToggleComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule],
      declarations: [ ToggleComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-toggle label="test" [(enabled)]="enabled" (toggle)="testToggle($event)"></app-toggle>'
  })
  class TestHostComponent {
    enabled: boolean;

    testToggle(event) {
      this.enabled = event;
    }
  }
});
