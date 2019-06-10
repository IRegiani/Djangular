import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface PessoaAula {
  id: Number,
  Contador: Number,
  Pessoas: any,
  Aulas: any
}

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
  // alunosGeral: Array<PessoaAula> = [];
  // alunosGeral = []
  alunosGeral


  constructor(private service: AuthService, 
              private _route: ActivatedRoute,
              private _router: Router,
              private shared: IdSelectorService,
              private spinner: NgxSpinnerService,) {

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
    console.log("DADOS: ")
    console.log(pos)
    console.log(bool)
    console.log(pessoaId)
    console.log(aulaId)
    console.log(auxPos)
    console.log(this.relacaoListIds)

    // Begins loading the PUT request
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        bdColor: 'rgba(100,149,237, .1)',
        color: 'yellow',
        fullScreen: true
      }
    );
    if (bool){ // Adds to attendance
      if (this.alunosAttendance[pos] < 2) {
        console.log("Vou adicionar a contador")
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
          console.log("Vou diminuir a contador")
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
    // Begins loading as the page shows up
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        bdColor: 'rgba(100,149,237, .1)',
        color: 'yellow',
        fullScreen: true
      }
    );
    var auxLista;

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
        console.log("AULAS TODAY ----------------")
        console.log(JSON.stringify(this.aulasToday));
        this.spinner.hide();
      }
       );
  }

    populateStudents(idAula): void {
      // Begins loading the students info
      this.spinner.show(undefined,
        {
          type: 'line-scale-party',
          size: 'medium',
          bdColor: 'rgba(100,149,237, .1)',
          color: 'yellow',
          fullScreen: true
        }
      );

      this.alunosAttendance = [];
      this.relacaoListIds = [];
      this.alunosGeral = [];

      var cont = -1;
      var id = -1;
      this.expansionAux = idAula

      this.service.getPessoaAulaDaAula(idAula).subscribe(
        (relacoes) => {
          let parsed = JSON.parse(JSON.stringify(relacoes));
          this.alunosGeral = parsed;
          console.log("TESTE IMPORTANTE---------------------");
          console.log(parsed);
          console.log(this.alunosGeral)
          // for (let relacao of relacoes){
          //   // let rel: PessoaAula;
          //   // this.relacaoListIds.push(relacao.id);
          //   // this.alunosAttendance.push(relacao.Contador);
          //   // this.alunosGeral.push(relacao.Pessoas);
          //   // rel.Aulas = relacao.Aulas;

          //   // this.alunosGeral.push(rel);
          // }
        console.log("RELACAO")
        console.log(relacoes)}, // on Success
        (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
        () => { // Once completed
          console.log(this.alunosAttendance);
          this.alunosAttendance.push(cont);
          this.relacaoListIds.push(id);
        }
         );

      // console.log("ALUNOS ATTENDANCE: " +this.alunosAttendance)
      console.log("ALUNOS GERAL: ")
      console.log(this.alunosGeral)
      console.log(JSON.stringify(this.alunosGeral))
      console.log(this.alunosGeral[1])
      console.log(this.relacaoListIds)
      console.log(this.alunosAttendance)
      this.spinner.hide();
  }

  expandCollapse(idAula){
    return idAula == this.expansionAux
    }
  }


