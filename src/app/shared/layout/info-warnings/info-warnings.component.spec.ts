import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWarningsComponent } from './info-warnings.component';

describe('InfoWarningsComponent', () => {
  let component: InfoWarningsComponent;
  let fixture: ComponentFixture<InfoWarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
