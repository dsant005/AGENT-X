import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ErrorComponent } from './error.component';
import { Component } from '@angular/core';

describe('ErrorComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule],
      declarations: [ ErrorComponent, TestHostComponent ]
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
    template: '<app-error [error]="error" (dismissError)="testDismiss()"></app-error>'
  })
  class TestHostComponent {
    error = {
      heading: 'Test Error',
      message: 'lol'
    };
    dismissClicked = 0;

    testDismiss() {
      this.dismissClicked += 1;
    }
  }
});
