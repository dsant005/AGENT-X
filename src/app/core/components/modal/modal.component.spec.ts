import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';

describe('ModalComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule],
      declarations: [ ModalComponent, TestHostComponent ]
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
    template: '<app-modal [modal]="modal" title="test" message="123" buttonLabel="456" (okClick)="testOk()"></app-modal>'
  })
  class TestHostComponent {
    modal = { opened: false};
    okClicked = 0;

    testOk() {
      this.okClicked += 1;
    }
  }
});
