import { Component, OnInit, Inject } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../components/dialog/dialog';

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
  constructor(private service: AuthService, private spinner: NgxSpinnerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        bdColor: 'transparent',
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
      console.log('Cursos: ', this.courseList)
      this.spinner.hide();
    });
  }

  expandCollapse(courseId: number) {
    return courseId === this.expansionAux;
    }

  populateStudents(turma) {
    this.expansionAux = turma.id;
    Object.assign(this.studentList, turma.Alunos, {});
  }

  removeStudent(student, turma) {
    this.service.removeAlunoFromTurma(turma.id, student.id).subscribe((res) => {
      const {status } = res;
      if (status === 200 ) {
        this.studentList = this.studentList.filter((value) => value.id !== student.id);
      }
    });
  }

  showAddStudent(classId: number) {
    this.spinner.show();
    this.service.getAllAlunos().subscribe((alunos) => {
      const allStudents = alunos;
      console.log('All Students: ', allStudents);
      this.studentList.map((student, index) => allStudents.splice(index, 1));
      this.spinner.hide();

      const dialogRef = this.dialog.open(Dialog, {
        maxWidth: '290px',
        height: '500px',
        data: allStudents,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log('This All Students: ', allStudents);
        // should get again
        // this.getCursos();
      });
    });
  }
}
