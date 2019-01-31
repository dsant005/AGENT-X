import { TestBed, async } from '@angular/core/testing';
import sinon from 'sinon';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from './core/core.module';
import { PopoverModule } from './modules/popover/popover.module';
import { ChromeService } from './core/services/chrome.service';
import { CaptainsLogService } from './core/services/captains-log.service';
import { StorageService } from './core/services/storage.service';
import { ObservableStub } from './tests-utils/observable-stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ClarityModule,
        CoreModule,
        PopoverModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const chrome = new ChromeService(null);
    const chromeMock = sinon.mock(chrome, 'listenForMessage');
    const captain = new CaptainsLogService();
    const storage = new StorageService();
    chromeMock.expects('listenForMessage').withArgs(sinon.match.any).returns(new ObservableStub());

    const app = new AppComponent(captain, chrome, storage);

    expect(app).toBeTruthy();
    chromeMock.verify();
    chromeMock.expects('listenForMessage').once();
  });
});
