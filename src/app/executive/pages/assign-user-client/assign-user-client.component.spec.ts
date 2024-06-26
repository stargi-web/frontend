import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserClientComponent } from './assign-user-client.component';

describe('AssignUserClientComponent', () => {
  let component: AssignUserClientComponent;
  let fixture: ComponentFixture<AssignUserClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignUserClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignUserClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
