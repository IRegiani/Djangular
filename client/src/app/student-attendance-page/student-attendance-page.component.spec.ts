import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendancePageComponent } from './student-attendance-page.component';

describe('StudentAttendancePageComponent', () => {
  let component: StudentAttendancePageComponent;
  let fixture: ComponentFixture<StudentAttendancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAttendancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
