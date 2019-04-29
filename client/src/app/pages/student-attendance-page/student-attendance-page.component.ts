import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance-page.component.html',
  styleUrls: ['./student-attendance-page.component.scss']
})
export class StudentAttendancePageComponent implements OnInit {
  
  /**RESULTADO DA QUERY */
  curso = { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-08", inicio: "20:00", fim: "22:30"};
  myDate = new Date();

  
  constructor() { }

  ngOnInit() {
  }

}
