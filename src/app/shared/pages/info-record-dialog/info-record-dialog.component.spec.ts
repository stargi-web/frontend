import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecordDialogComponent } from './info-record-dialog.component';

describe('InfoRecordDialogComponent', () => {
  let component: InfoRecordDialogComponent;
  let fixture: ComponentFixture<InfoRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoRecordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
