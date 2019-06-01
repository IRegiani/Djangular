import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { IdSelectorService} from '../../services/id-selector.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  aulaId : number;
  presenca : Array<number> = []; // <- Talvez mudar pra enum
  alunos : Array<any> = [];
  // Will probably have to make a Tuple here, of Aluno and Presenca

  constructor(private shared : IdSelectorService,
              private service : AuthService) { }

  ngOnInit() {
    this.aulaId = this.shared.getData();
    this.getAlunosFromAula(this.aulaId);
  }

  // --GENERAL METHODS--
  updateStudentAttendance(studentId, pos){
    if (this.presenca[pos] < 2) {
      this.presenca[pos] += 1;


    } else {
      // Printar na tela que ele jah estah com presenca
    }
  }

  cancelStudentAttendance(studentId, pos){
    if (this.presenca[pos] > 0) {
      this.presenca[pos] -= 1;
    } else {
      // Printar na tela que ele jah NAO estah com presenca
    }
  }

  // --SERVICE METHODS--
    getAlunosFromAula(aulaId : Number){
    var auxLista : Array<any> = [];
    var auxAlunos : Array<any> = [];
    this.service.getAllAlunosDaAula().subscribe(
      (alunosAulas) => {auxLista = alunosAulas }, // on Success
      (error) => {console.log("ERROR! --getAllAlunosDaAula")}, // error
      () => { // Once completed
        for (let alunosAula of auxLista){
          if (alunosAula.Aulas == aulaId){
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
