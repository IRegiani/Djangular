import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes-page.component.html',
  styleUrls: ['./manage-classes-page.component.css']
})
export class ManageClassesComponent implements OnInit {

  listaCurso: Array<any> = [];
  TEACHER_ID = 6; // should get user ID from service singleton
  constructor(private service: AuthService) { }

  ngOnInit() {
    // load spinner
    this.getCursos();
  }

  // Calls service to get "cursos"
  getCursos(): void {
    this.service.getTurmasDoColaborador(this.TEACHER_ID).subscribe((cursos) => {
      this.listaCurso = cursos;
      console.log('Cursos: ', cursos);
    });
  }
}
