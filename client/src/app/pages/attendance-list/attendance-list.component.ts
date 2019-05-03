import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { IdSelectorService} from '../../services/id-selector.service';
import { prepareProfile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  aulaId : Number;
  presenca : Array<Number> = []; // <- Talvez mudar pra enum
  alunos : Array<any> = [];

  constructor(private shared : IdSelectorService,
              private service : AuthService) { }

  ngOnInit() {
    this.aulaId = this.shared.getData();
    this.getAlunosFromAula(this.aulaId);
  }


    getAlunosFromAula(aulaId : Number){
    var auxLista : Array<any> = [];
    var auxAlunos : Array<any> = [];
    this.service.getAllAlunosDaAula().subscribe(
      (alunosAulas) => {auxLista = alunosAulas }, // on Success
      (error) => {console.log("ERROR! --getAllAlunosDaAula")}, // error
      () => { // Once completed
        for (let alunosAula of auxLista){
          if (alunosAula.Aulas.indexOf(aulaId) > -1){
            auxAlunos.push(alunosAula.Pessoas);
            this.presenca.push(alunosAula.Contador);
            }
          }
        console.log(JSON.stringify(this.presenca));
        this.getAlunosInfo(auxAlunos);
      }
       );

    }
    

    getAlunosInfo(alunosIds : Array<any>){
      var auxLista : Array<any> = [];
      this.service.getAllAlunos().subscribe(
        (alunos) => {auxLista = alunos }, // on Success
        (error) => {console.log("ERROR! --getAllAlunos")}, // error
        () => { // Once completed
          for (let aluno of auxLista){
            if (alunosIds.indexOf(aluno.id) > -1){
                this.alunos.push(aluno);
              }
            }
          console.log(JSON.stringify(this.alunos));
        }
         );
  
      }




}
