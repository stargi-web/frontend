import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAssignedViewComponent } from './clients-assigned-view.component';

describe('ClientsAssignedViewComponent', () => {
  let component: ClientsAssignedViewComponent;
  let fixture: ComponentFixture<ClientsAssignedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsAssignedViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsAssignedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
