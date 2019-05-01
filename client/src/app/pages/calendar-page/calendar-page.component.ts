import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { Location } from '@angular/common';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarComponent implements OnInit {
  /** DATABASE */
  calendario = [
    { id: "ca1", data: "2019-04-15", inicio: "20:00", fim: "22:30" },
    { id: "ca2", data: "2019-04-18", inicio: "20:00", fim: "22:30" },
    { id: "cgd", data: "2019-04-19", inicio: "20:00", fim: "22:30" },
    
  ]

  evento = [
    { id: "ca1", nomeEvento: "Evento A" },
    { id: "ca2", nomeEvento: "Evento B" },
    { id: "csm", nomeEvento: "Evento C" },
    { id: "cgd", nomeEvento: "Evento D" }
  ]

  /**LOCALDATA */
  cursoCalendario: Array<any> = [];
  myDate = new Date()
  
  constructor(private location: Location) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.evento.forEach(element1 => {
      this.calendario.forEach(element2 => {
        if (element1.id === element2.id) {
          this.cursoCalendario.push({ id: element1.id, nomeCurso: element1.nomeEvento, data: element2.data, inicio: element2.inicio, fim: element2.fim });
        }
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
  

}
