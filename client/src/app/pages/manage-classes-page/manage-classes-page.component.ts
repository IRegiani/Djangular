import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes-page.component.html',
  styleUrls: ['./manage-classes-page.component.css']
})
export class ManageClassesComponent implements OnInit {

  courseList: Array<any> = [];
  studentList: Array<any> = [];
  TEACHER_ID = 6; // should get user ID from service singleton
  expansionAux = -1;
  constructor(private service: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        bdColor: 'rgba(100,149,237, .1)',
        color: 'yellow',
        fullScreen: false
      }
    );
    this.getCursos();
  }

  // Calls service to get "cursos"
  getCursos(): void {
    this.service.getTurmasDoColaborador(this.TEACHER_ID).subscribe((courses) => {
      this.courseList = courses;
      this.spinner.hide();
      console.log('Cursos: ', this.courseList);
    });
  }

  expandCollapse(courseId: number) {
    return courseId === this.expansionAux;
    }

  populateStudents(turma) {
    this.expansionAux = turma.id;
    Object.assign(this.studentList, turma.Alunos, {});
    // console.log('this.student: ', this.studentList)
  }

  removeStudent(student, turma) {
    // should remove from studentList
    this.service.removeAlunoFromTurma(student.id, turma.id);
  }

  goToAddStudent(turmaId: number) {
    // this.shared.setData(aulaId);
    // this._router.navigate(['addStudentSingleClass']);
  }
}
