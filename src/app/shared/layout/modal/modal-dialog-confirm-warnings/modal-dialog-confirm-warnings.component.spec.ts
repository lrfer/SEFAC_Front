import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogConfirmWarningsComponent } from './modal-dialog-confirm-warnings.component';

describe('ModalDialogConfirmWarningsComponent', () => {
  let component: ModalDialogConfirmWarningsComponent;
  let fixture: ComponentFixture<ModalDialogConfirmWarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogConfirmWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogConfirmWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
