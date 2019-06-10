import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentSingleClassComponent } from './add-student-single-class.component';

describe('AddStudentSingleClassComponent', () => {
  let component: AddStudentSingleClassComponent;
  let fixture: ComponentFixture<AddStudentSingleClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentSingleClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentSingleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
