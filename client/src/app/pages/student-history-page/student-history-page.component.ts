import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';
import { Observable } from 'rxjs';
import {ChangeDetectorRef} from '@angular/core'
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';

// interface AulasPerTurma{
//   idTurma: number;
//   aulas: any;
// }

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history-page.component.html',
  styleUrls: ['./student-history-page.component.css']
})

@Injectable()
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
  absenceList : any;
  auxCount = 0;
  absenceCounter: Array<number> = [];
  dataLoaded: Promise<boolean>;
  example;
  auxAulas;
  loaded = false;
  coursesIds : Array<any> = [];
  coursesCounter: Array<any> = [];

  constructor(private location: Location, 
              private service: AuthService, 
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTurmasAluno(this.fakeId);
  }

  // --GENERAL METHODS--
  goBack(): void {
    this.location.back();
  }
  
//   separateAbsentAulas(lista){ // Very inefficient... But...
//     console.log("A");
//     var bool;
//     var i;
//     console.log(lista);
//     for (i = 0; i < lista.length; i++){
//      var aulas = lista[i];
//      console.log(aulas);
//       if (aulas != 0){
//         if (aulas.length > 0){ // Kind of redundant, but important...
//           for (let aula of aulas){
//             bool = false;
//             for (let absence of this.absenceList){
//               if (aula.id == absence.Aulas){
//                 console.log(aula.id);
//                 console.log(absence.Aulas);
//                 bool = true;
//               }
//             }
//             if (!bool){ // The person was NOT absent in this Aula
//               // Deletes Aula where he was present
//                 const index = aulas.indexOf(aula, 0);
//                 if (index > -1) {
//                   console.log("ENTREI");
//                   lista[i].splice(index, 1);
//                   }
//           }
//         }
//       }
//     } 

//   }

//   this.allAulas.push(lista);
//   this.allAulas.push(0);
//   this.loaded = true;

// }

 delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

  separateCourseAbsences(){
      // await delay(5000);
      for (let absence of this.absenceList){
        let index = this.coursesIds.indexOf(absence.Curso);
        if (index > -1) {
          this.coursesCounter[index] += 1;
        } else {
          this.coursesIds.push(absence.Curso);
          this.coursesCounter.push(0);
        }
      }
    

    this.loaded = true;


  }

    // --SERVICE METHODS--
  // Calls service to get "cursos"
  getTurmasAluno(id: number): void{
    this.service.getTurmasAluno(id).subscribe(
      (turmas) => {this.turmasAluno = turmas }, // on Success
      (error) => {console.log("ERROR! --getTurmasAluno")}, // error
      () => { // Once completed
        console.log(JSON.stringify(this.turmasAluno));
        this.getAulasComFalta(id);
        // for (let turma of this.turmasAluno){
        //   this.getAulasAluno(turma.id);
        // } 

      }
       );
  }

  getAulasComFalta(id: number){

      this.service.getFaltasTotais(id).subscribe(
        (faltas) => {this.absenceList = faltas;
        // this.dataLoaded = Promise.resolve(true);
        // this.separateCourseAbsences();
      }, // on Success
        (error) => {console.log("ERROR! --getAulasComFalta")}, // error
        () => { // Once completed
          console.log(JSON.stringify(this.absenceList));
          this.separateCourseAbsences();
          // for (let turma of this.turmasAluno){
          //   this.getAulasAluno(turma.id);
          // } 
          }
  
         );
    
  }



  // getAulasAluno(id: number): void{
  //   var auxLista : any;

  //   this.service.getAulasTurma(id).subscribe(
  //     (aulas) => {
  //       auxLista = aulas 
  //       // this.allAulas.push(aulas);
  //       // this.allAulas.push(0);
  //     }, // on Success
  //     (error) => {console.log("ERROR! --getAulasTurma")}, // error
  //     () => { // Once completed
  //       // this.allAulas.push(auxLista);
  //       console.log(JSON.stringify(auxLista));
  //       // console.log(JSON.stringify(this.allAulas[0][0]));
  //       // console.log(this.allAulas);
  //       // this.test = false;
  //       this.auxAulas = auxLista;
  //       this.getAbsencePerAula(this.fakeId, auxLista);
  //       // this.example = this.allAulas[0][0];
  //       // console.log(JSON.stringify(this.example));

  //       // this.separateAbsentAulas(auxLista);
  //       // console.log(this.allAulas);

  //       // this.allAulas.push(0);
  //       // console.log(JSON.stringify(this.allAulas));
  //       // this.getAulas(this.listaTurmas);
  //       console.log(this.absenceList);
  //       console.log(this.absenceCounter);

  //       this.ref.detectChanges();
  //       this.dataLoaded = Promise.resolve(true);
  //     }

  //      );

  //     console.log(JSON.stringify(this.allAulas));
  // }

  // getAbsencePerAula(idAluno: number, aulas: Array<any>){
  //     var faltou;
  //     // var auxAulas = aulas;
  //     // var aux = this.allAulas;
  //   if (aulas.length > 0 ) {
  //     var aula = aulas.pop();
  //     if (aula != 0) { // <= MAYBE WAS RENDERED UNNECESSARY
  //       this.service.getFalta(idAluno, aula.id).subscribe(
  //         (falta) => {faltou = falta }, // on Success
  //         (error) => {console.log("ERROR! --getFalta")}, // error
  //         () => { // Once completed
  //           if (faltou.length > 0) {
  //             this.absenceList.push(faltou); // Can only be one
  //             this.auxCount += 1;
  //           } 
  //           this.getAbsencePerAula(idAluno, aulas);
  //           // this.getAulas(this.listaTurmas);
  //         }
          
  //         );
  //     }
  //   } else {
  //     // this.absenceList.push(0); // TEMPORARY COMMENTING
  //     this.absenceCounter.push(this.auxCount);
  //     this.auxCount = 0;
  //     // this.test = true;
  //     this.loaded = false;
  //     this.separateAbsentAulas(this.auxAulas);
  //   }
  // }


}
