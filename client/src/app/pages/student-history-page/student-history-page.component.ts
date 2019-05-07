import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';

// interface AulasPerTurma{
//   idTurma: number;
//   aulas: any;
// }

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
  nome = "TESTE";

  fakeId = 1 // WILL BE CHANGED FOR A SINGLETON WHEN WE HAVE ACCESS TO EACH ONE'S ID
  // turmasAluno: Array<any> = [];
  turmasAluno: any;
  allAulas: Array<any> = [];
  absenceList : Array<any> = [];
  auxCount = 0;

  constructor(private location: Location, private service: AuthService) { }

  ngOnInit() {
    this.getTurmasAluno(this.fakeId);
  }

  // --GENERAL METHODS--
  goBack(): void {
    this.location.back();
  }
  

    // --SERVICE METHODS--
  // Calls service to get "cursos"
  getTurmasAluno(id: number): void{
    this.service.getTurmasAluno(id).subscribe(
      (turmas) => {this.turmasAluno = turmas }, // on Success
      (error) => {console.log("ERROR! --getTurmasAluno")}, // error
      () => { // Once completed
        console.log(JSON.stringify(this.turmasAluno));
        for (let turma of this.turmasAluno){
          this.getAulasAluno(turma.id);
        } 
      }
       );
  }

  getAulasAluno(id: number): void{
    var auxLista : any;

    this.service.getAulasTurma(id).subscribe(
      (aulas) => {auxLista = aulas }, // on Success
      (error) => {console.log("ERROR! --getAulasTurma")}, // error
      () => { // Once completed
        this.allAulas.push(auxLista);
        this.getAbsencePerAula(this.fakeId, this.allAulas);
        this.allAulas.push(0);
        console.log(JSON.stringify(this.allAulas));
        // this.getAulas(this.listaTurmas);
      }

       );
  }

  getAbsencePerAula(idAluno: number, aulas: Array<any>){
      var boolean;
      var aux = this.allAulas;
    if (aulas.length > 0 ) {
      var aula = this.allAulas.pop();
      if (aula != 0) {
        this.service.getFalta(idAluno, aula.id).subscribe(
          (t_f) => {boolean = t_f }, // on Success
          (error) => {console.log("ERROR! --getFalta")}, // error
          () => { // Once completed
            if (boolean) {
              this.absenceList.push(aula);
              this.auxCount += 1;
            } 
            this.getAbsencePerAula(idAluno, this.allAulas);
            // this.getAulas(this.listaTurmas);
          }
          
          );
      }
    } else {
      this.absenceList.push(this.auxCount);
      this.auxCount = 0;
    }
  }


}
