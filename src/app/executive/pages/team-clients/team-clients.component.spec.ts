import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamClientsComponent } from './team-clients.component';

describe('TeamClientsComponent', () => {
  let component: TeamClientsComponent;
  let fixture: ComponentFixture<TeamClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
