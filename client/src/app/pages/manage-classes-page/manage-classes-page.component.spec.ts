import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassesPageComponent } from './manage-classes-page.component';

describe('ManageClassesPageComponent', () => {
  let component: ManageClassesPageComponent;
  let fixture: ComponentFixture<ManageClassesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClassesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
