import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLoadingButtonComponent } from './ng-loading-button.component';

describe('NgLoadingButtonComponent', () => {
  let component: NgLoadingButtonComponent;
  let fixture: ComponentFixture<NgLoadingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgLoadingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
