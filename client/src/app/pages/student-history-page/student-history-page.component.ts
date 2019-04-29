import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history-page.component.html',
  styleUrls: ['./student-history-page.component.css']
})
export class StudentHistoryComponent implements OnInit {

  /** DATABASE */



  /** RESULT QUERY */
  cursoFalta = [
    { id: "ca1", nomeCurso: "1º Ciclo", falta: 3, totalFalta: 10 },
    { id: "ca2", nomeCurso: "Os Mensageiros", falta: 1, totalFalta: 10 },
    { id: "csm", nomeCurso: "GM", falta: 0, totalFalta: 10 },
    { id: "cgd", nomeCurso: "Evangelização", falta: 2, totalFalta: 10 }
  ]


  /** LOCAL STORE */
  user = { id: "user123abc", nome: "Steve Magal", email: "magal@explosivo.com.br" };


  constructor() { }

  ngOnInit() {
    
  }

  


}
