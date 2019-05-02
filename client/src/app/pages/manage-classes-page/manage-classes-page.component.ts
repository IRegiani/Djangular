import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes-page.component.html',
  styleUrls: ['./manage-classes-page.component.css']
})
export class ManageClassesComponent implements OnInit {
  /** DATABASE */
  registro = [
    { id: "ca1", idAula: 11, data: "2019-04-08", inicio: "20:00", fim: "22:30" },
    { id: "ca1", idAula: 12, data: "2019-04-01", inicio: "20:00", fim: "22:30" },
    { id: "ca2", idAula: 21, data: "2019-04-11", inicio: "20:00", fim: "22:30" },
    { id: "ca2", idAula: 22, data: "2019-04-04", inicio: "20:00", fim: "22:30" },
    { id: "cgd", idAula: 31, data: "2019-04-12", inicio: "20:00", fim: "22:30" },
    { id: "cgd", idAula: 32, data: "2019-04-05", inicio: "20:00", fim: "22:30" },
    { id: "csm", idAula: 41, data: "2019-04-13", inicio: "20:00", fim: "22:30" },
    { id: "csm", idAula: 42, data: "2019-04-06", inicio: "20:00", fim: "22:30" }
  ]

  curso = [
    { id: "ca1", nomeCurso: "1º Ciclo" },
    { id: "ca2", nomeCurso: "Os Mensageiros" },
    { id: "csm", nomeCurso: "GM" },
    { id: "cgd", nomeCurso: "Evangelização" }
  ]



  listaCurso: Array<any> = [];

  constructor(private service: AuthService) { }

  ngOnInit() {
    // this.getData();
    this.getCursos();
  }

  // STATIC TEST
  getData(): void{
    this.curso.forEach(element1 => {
      this.registro.forEach(element2 => {
        if(element1.id === element2.id){
          this.listaCurso.push({id: element1.id, nomeCurso: element1.nomeCurso, idAula: element2.idAula, data: element2.data});
        }
      });
    });
  }

  // Calls service to get "cursos"
  getCursos(): void{
    this.service.getCursos().subscribe(cursos =>
       this.listaCurso = cursos);
  }
}
