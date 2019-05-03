import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';



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


  fixedParameter = 6 // Rodrigo's num
  listaTurmas: Array<any> = [];
  listaAulas: Array<any> = [];
  aulasToday: Array<any> = [];
  turmasToday: Array<any> = [];
  class_student: [any, Array<any>][] = [];

  constructor(private service: AuthService) {

  }

  ngOnInit() {
    this.getTurmas(this.fixedParameter);
  }

  // Calls service to get "cursos"
  getTurmas(universalProfId: Number): void{
    var auxLista : Array<any> = [];

    this.service.getTurmasDoColaborador().subscribe(
      (turmas) => {auxLista = turmas }, // on Success
      (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
      () => { // Once completed
        for (let turma of auxLista){
          if (turma.Colaborador == universalProfId) {
             this.listaTurmas.push(turma.Turma);
          }
        }
        console.log(JSON.stringify(this.listaTurmas));
        this.getAulas(this.listaTurmas);
      }
       );
  }

  getAulas(turmasIds : Array<any>){
    var auxLista : Array<any> = [];

    this.service.getAllTurmas().subscribe(
      (turmas) => {auxLista = turmas }, // on Success
      (error) => {console.log("ERROR! --getAulas")}, // error
      () => { // Once completed
        for (let turma of auxLista){
          if (turmasIds.indexOf(turma.id) > -1) { // Found the Turma of the teacher
           this.listaAulas = this.listaAulas.concat(turma.Aulas);
          }
        }
        console.log(JSON.stringify(this.listaAulas));
        this.getAulasToday(this.listaAulas);
      }
       );
  }
  
  getAulasToday(aulasIds : Array<any>){
    var auxLista : Array<any> = [];

    this.service.getAllAulas().subscribe(
      (aulas) => {auxLista = aulas }, // on Success
      (error) => {console.log("ERROR! --getAulasToday")}, // error
      () => { // Once completed
        for (let aula of auxLista){
          if (aulasIds.indexOf(aula.id) > -1) { // Found the Turma of the teacher
            var date = new Date()
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            
            var today = yyyy + '-' + mm + '-' + dd;
            if (aula.Data == today) {
              this.aulasToday.push(aula);
            }
          }
        }
        console.log(JSON.stringify(this.aulasToday));

        // Make array of turmas (since they are the ones with each student)
        var auxTurmas = []
        this.service.getAllTurmas().subscribe(
          (turmas) => {auxTurmas = turmas }, // on Success
          (error) => {console.log("ERROR! --getAllTurmas2")}, // error
          () => { // Once completed
            for (let turma of auxTurmas){
              console.log(turma);
              var aulasArr: Array<any> = turma.Aulas as Array<any> ;
              for (let aula of this.aulasToday) {
                console.log(JSON.stringify(aulasArr));
                if (aulasArr.indexOf(aula.id) > -1) {
                  this.turmasToday.push(turma);
               }
              }
            }
            console.log(JSON.stringify(this.turmasToday));

            // Finally, add both values to the tuple
            for (let aula of this.aulasToday){
              var i = this.aulasToday.indexOf(aula);
              this.class_student.push([aula, this.turmasToday[i]])
            }
            console.log(this.class_student);
          }
           );
      }
       );
  }

}
