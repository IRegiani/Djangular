import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes-page.component.html',
  styleUrls: ['./manage-classes-page.component.css']
})
export class ManageClassesComponent implements OnInit {

  listaCurso: Array<any> = [];

  constructor(private service: AuthService) { }

  ngOnInit() {
    // load spinner
    // should get user ID from service
    // should get all Turmas related to that ID, and extract all Courses from them
    this.getCursos();
  }

  // Calls service to get "cursos"
  getCursos(): void {
    this.service.getCursos().subscribe(cursos =>
       this.listaCurso = cursos);
  }
}
