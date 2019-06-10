import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-teacher-attendance-page',
  templateUrl: './teacher-attendance-page.component.html',
  styleUrls: ['./teacher-attendance-page.component.css']
})
export class TeacherAttendancePageComponent implements OnInit {


  fixedParameter = 6 // Rodrigo's num
  listaTurmas: Array<any> = [];
  listaAulas: Array<any> = [];
  aulasToday: Array<any> = [];
  turmasToday: Array<any> = [];
  // class_student: [any, any, Array<any>][] = [];
  class_student:  Array<any>[] = [];
  alunos_aula:  Array<any>[] = [];
  alunos = []
  alunosAttendance = []
  relacaoListIds = []
  expansionAux = -1

  constructor(private service: AuthService, 
              private _route: ActivatedRoute,
              private _router: Router,
              private shared: IdSelectorService) {

  }

  ngOnInit() {
    this.getTurmas(this.fixedParameter);
  }


  // --GENERAL METHODS--
  goToAttendance(aulaId: Number){
    this.shared.setData(aulaId);

    this._router.navigate(['attendanceList']);
  }

  studentAttendendance(pos , bool, pessoaId, aulaId, auxPos){
    if (bool){ // Adds to attendance
      if (this.alunosAttendance[pos] < 2) {
        var add = this.alunosAttendance[pos] + 1;
        this.alunosAttendance[pos] = add;
        // Update service
        let pessoaAula =  {
          Pessoas: pessoaId,
          Aulas: aulaId,
          Contador: this.alunosAttendance[pos]
        }

        this.service.updateCurrentAttendance(this.relacaoListIds[pos], pessoaAula).subscribe(result => {
              console.log("UPDATE DE PRESENCA - presente")
              console.log(result);
              // this.populateStudentAttendance(auxPos, aulaId);
            })

      }
    } else {// Subtracts to attendance
        if (this.alunosAttendance[pos] > 0) {
          var subtract = this.alunosAttendance[pos] - 1;
          this.alunosAttendance[pos] = subtract;
          // Update service
          let pessoaAula =  {
            Pessoas: pessoaId,
            Aulas: aulaId,
            Contador: this.alunosAttendance[pos]
          }
  
          this.service.updateCurrentAttendance(this.relacaoListIds[pos], pessoaAula).subscribe(result => {
                console.log("UPDATE DE PRESENCA - presente")
                console.log(result);
                // this.populateStudentAttendance(auxPos, aulaId);
              })
        }
    }
  }

  // --SERVICE METHODS--
  // Calls service to get "cursos"
  getTurmas(universalProfId: Number): void{
    var auxLista : Array<any> = [];

    this.service.getAllTurmasDoColaborador().subscribe(
      (turmas) => {auxLista = turmas }, // on Success
      (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
      () => { // Once completed
        for (let turma of auxLista){
          if (turma.Colaborador == universalProfId) {
             this.listaTurmas.push(turma.Turma);
          }
        }
        console.log("A")
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
        var ids = [];
        for (let aula of this.listaAulas){
          ids.push(aula.id)
        }
        // this.getAulasToday(this.listaAulas);
        this.getAulasToday(ids);
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
          console.log("B")
          console.log(auxLista)
          console.log(aulasIds)
          
          if (aulasIds.indexOf(aula.id) > -1) { // Found the Turma of the teacher
            console.log("ENTREI")
            var date = new Date()
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            
            var today = yyyy + '-' + mm + '-' + dd;
            console.log("TODAY: "+today)
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
              console.log("AQUI")
              console.log(turma);
              var aulasArr: Array<any> = turma.Aulas as Array<any> ;
              for (let aula of this.aulasToday) {
                console.log("aulasArr")
                console.log(JSON.stringify(aulasArr));
                console.log("AULA")
                console.log(aula)
                var aId = []
                for (let arr of aulasArr){
                  aId.push(arr.id)
                }
                if (aId.indexOf(aula.id) > -1) {
                  console.log("ENTRA 2")
                  this.turmasToday.push(turma);
               }
              }
            }
            console.log("TURMAS TODAY")
            console.log(JSON.stringify(this.turmasToday));





            // Finally, add both values to the tuple
            for (let aula of this.aulasToday){
              var i = this.aulasToday.indexOf(aula);
              // this.class_student.push([aula, this.turmasToday[i], this.turmasToday[i].Alunos])
              this.class_student.push(aula)

            }
            
            console.log(this.class_student);
          }
           );
      }
       );
  }

    populateStudentAttendance(num, idAula): void {
      this.alunosAttendance = [];
      this.relacaoListIds = [];
      var cont = -1;
      var id = -1;
      this.expansionAux = idAula

      for (let aluno of this.turmasToday[num].Alunos){
        console.log("AULA")
        console.log(this.turmasToday[num])
        console.log("idAula")
        console.log(idAula)
        console.log("idAluno")
        console.log(aluno.id)
        this.service.getPresencaEmAula(aluno.id, idAula).subscribe(
          (relacao) => {
            cont = relacao[0].Contador;
            id = relacao[0].id;
          console.log("RELACAO")
          console.log(relacao)}, // on Success
          (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
          () => { // Once completed
            console.log(this.alunosAttendance);
            this.alunosAttendance.push(cont);
            this.relacaoListIds.push(id);
          }
           );
      }

      console.log("ALUNOS ATTENDANCE: " +this.alunosAttendance)
  }

  expandCollapse(idAula){
    return idAula == this.expansionAux
    }
  }


