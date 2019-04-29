import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendancePageComponent } from './teacher-attendance-page.component';

describe('TeacherAttendancePageComponent', () => {
  let component: TeacherAttendancePageComponent;
  let fixture: ComponentFixture<TeacherAttendancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttendancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
