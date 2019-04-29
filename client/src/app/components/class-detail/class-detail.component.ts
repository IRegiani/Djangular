import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.sass']
})
export class ClassDetailComponent implements OnInit {
  /** DATABASE */

  presencaAluno = [
    { id: 11, nome: 'Ogari ', presente: true },
    { id: 11, nome: 'Rafael', presente: true },
    { id: 11, nome: 'Iago', presente: true },
    { id: 11, nome: 'Vinicius', presente: true },
    { id: 11, nome: 'Steve', presente: true },
    { id: 11, nome: 'João', presente: false },
    { id: 11, nome: 'Matheus', presente: true },
    { id: 11, nome: 'Adriana', presente: true },
    { id: 11, nome: 'Luke', presente: false },
    { id: 11, nome: 'Dr. Who', presente: false },

    { id: 12, nome: 'Ogari ', presente: true },
    { id: 12, nome: 'Rafael', presente: true },
    { id: 12, nome: 'Iago', presente: true },
    { id: 12, nome: 'Vinicius', presente: true },
    { id: 12, nome: 'Steve', presente: true },
    { id: 12, nome: 'João', presente: true },
    { id: 12, nome: 'Matheus', presente: true },
    { id: 12, nome: 'Adriana', presente: true },
    { id: 12, nome: 'Luke', presente: true },
    { id: 12, nome: 'Dr. Who', presente: true },

    { id: 21, nome: 'Eduardo', presente: true },
    { id: 21, nome: 'Pedro', presente: true },
    { id: 21, nome: 'Tiago', presente: true },
    { id: 21, nome: 'Lorena', presente: true },
    { id: 21, nome: 'Maria', presente: true },
    { id: 21, nome: 'João', presente: true },
    { id: 21, nome: 'Matheus', presente: true },
    { id: 21, nome: 'Pedro', presente: true },
    { id: 21, nome: 'Luke', presente: true },
    { id: 21, nome: 'Steve Magal', presente: true },

    { id: 22, nome: 'Eduardo', presente: false },
    { id: 22, nome: 'Pedro', presente: false },
    { id: 22, nome: 'Tiago', presente: true },
    { id: 22, nome: 'Lorena', presente: false },
    { id: 22, nome: 'Maria', presente: true },
    { id: 22, nome: 'João', presente: true },
    { id: 22, nome: 'Matheus', presente: true },
    { id: 22, nome: 'Pedro', presente: true },
    { id: 22, nome: 'Luke', presente: false },
    { id: 22, nome: 'Steve Magal', presente: false },

    { id: 31, nome: 'Eduardo', presente: true },
    { id: 31, nome: 'Iago', presente: true },
    { id: 31, nome: 'Tiago', presente: true },
    { id: 31, nome: 'Ogari', presente: true },
    { id: 31, nome: 'Maria', presente: true },
    { id: 31, nome: 'Dr. Who', presente: true },
    { id: 31, nome: 'Matheus', presente: true },
    { id: 31, nome: 'João', presente: true },
    { id: 31, nome: 'Luke', presente: true },
    { id: 31, nome: 'Steve', presente: true },
  ]

  /**LOCALDATA */
  presente: Array<any> = [];

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getListaId();
  }

  getListaId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.presencaAluno.forEach(element => {
      if (id === element.id) {
        this.presente.push(element);
      }
    });
  }
  goBack(): void {
    this.location.back();
  }

}
