import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GametrackerComponent } from './gametracker.component';

describe('GametrackerComponent', () => {
  let component: GametrackerComponent;
  let fixture: ComponentFixture<GametrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GametrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GametrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
