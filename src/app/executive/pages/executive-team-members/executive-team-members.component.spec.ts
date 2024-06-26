import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveTeamMembersComponent } from './executive-team-members.component';

describe('ExecutiveTeamMembersComponent', () => {
  let component: ExecutiveTeamMembersComponent;
  let fixture: ComponentFixture<ExecutiveTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveTeamMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutiveTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
