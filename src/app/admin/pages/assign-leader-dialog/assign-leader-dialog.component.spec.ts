import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaderDialogComponent } from './assign-leader-dialog.component';

describe('AssignLeaderDialogComponent', () => {
  let component: AssignLeaderDialogComponent;
  let fixture: ComponentFixture<AssignLeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignLeaderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignLeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
