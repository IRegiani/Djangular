import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-teacher-attendance-page',
  templateUrl: './teacher-attendance-page.component.html',
  styleUrls: ['./teacher-attendance-page.component.css']
})
export class TeacherAttendancePageComponent implements OnInit {

  /** DATABASE */
  calendario = [
    { id: "ca1", data: "2019-04-15", inicio: "20:00", fim: "22:30" },
    { id: "ca2", data: "2019-04-18", inicio: "20:00", fim: "22:30" },
    { id: "cgd", data: "2019-04-19", inicio: "20:00", fim: "22:30" },

  ]

  curso = [
    { id: "ca1", nomeCurso: "1º Ciclo" },
    { id: "ca2", nomeCurso: "Os Mensageiros" },
    { id: "csm", nomeCurso: "GM" },
    { id: "cgd", nomeCurso: "Evangelização" }
  ]

  alunos = [
    { id: 1, nome: 'Ogari ' },
    { id: 2, nome: 'Rafael' },
    { id: 3, nome: 'Iago' },
    { id: 4, nome: 'Vinicius' },
    { id: 5, nome: 'Steve' },
    { id: 6, nome: 'João' },
    { id: 7, nome: 'Matheus' },
    { id: 8, nome: 'Pedro' },
    { id: 9, nome: 'Luke' },
    { id: 10, nome: 'Dr. Who' }
  ]

  /** RESULTADO DA PESQUISA */
  presencaCurso =
    { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-15", inicio: "20:00", fim: "22:30" };

  myDate = new Date()

  lista: Array<any> = [];
  constructor() {

  }

  ngOnInit() {
  }

  getPresenca(): void {
   
  }

}
