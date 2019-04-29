import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.sass']
})
export class HistoryDetailComponent implements OnInit {
  /**DATABASE */
  presenca = [
    { idFaltas: "ca1", data: "2019-03-04", aula1: true, aula2: false },
    { idFaltas: "ca1", data: "2019-03-11", aula1: false, aula2: false },
    { idFaltas: "ca1", data: "2019-03-18", aula1: false, aula2: false },
    { idFaltas: "ca2", data: "2019-03-07", aula1: true, aula2: false },
    { idFaltas: "cgd", data: "2019-03-22", aula1: false, aula2: false },
    { idFaltas: "cgd", data: "2019-04-05", aula1: false, aula2: false }
    
  ]

  curso = [
    { id: "ca1", nomeCurso: "1º Ciclo" },
    { id: "ca2", nomeCurso: "Os Mensageiros" },
    { id: "csm", nomeCurso: "GM" },
    { id: "cgd", nomeCurso: "Evangelização" }
  ]


  /** LOCAL STORE */
  user = { id: "user123abc", nome: "Steve Magal", email: "magal@explosivo.com.br" };


  constructor(private route: ActivatedRoute, private location: Location) { }

  userFalta: Array<any> = [];
  nomeCurso;

  ngOnInit() {
    console.log("init");
    this.getFaltaId();
  }

  ngOnChanges(){

  }

  getFaltaId() {
    console.log("oi");
    const id = this.route.snapshot.paramMap.get('id');
    this.curso.forEach(element => {
      if (id === element.id) {
        
        this.nomeCurso = element.nomeCurso;
      }
    });
    this.presenca.forEach(element => {
      if (id === element.idFaltas) {
        this.userFalta.push(element);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
