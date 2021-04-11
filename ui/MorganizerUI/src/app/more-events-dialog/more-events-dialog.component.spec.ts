import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreEventsDialogComponent } from './more-events-dialog.component';

describe('MoreEventsDialogComponent', () => {
  let component: MoreEventsDialogComponent;
  let fixture: ComponentFixture<MoreEventsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreEventsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
