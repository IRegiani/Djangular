import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  expansionAux = -1
  alunosDaAula


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
  goToAddStudent(aulaId: Number){
    this.shared.setData(aulaId);
    this._router.navigate(['addStudentSingleClass']);
  }

  studentAttendendance(pos , bool){
    console.log("DADOS: ")
    console.log(pos)
    console.log(bool)
    // console.log(auxPos)

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
      if (this.alunosDaAula[pos].Contador < 2) {
        console.log("Vou adicionar a contador")
        var add = this.alunosDaAula[pos].Contador + 1;
        this.alunosDaAula[pos].Contador = add;
        // Update service
        let pessoaAula =  {
          Pessoas: this.alunosDaAula[pos].Pessoas.id,
          Aulas: this.alunosDaAula[pos].Aulas.id,
          Contador: this.alunosDaAula[pos].Contador
        }

        this.service.updateCurrentAttendance(this.alunosDaAula[pos].id, pessoaAula).subscribe(result => {
              console.log("UPDATE DE PRESENCA - presente")
              console.log(result);
              this.populateStudents(pessoaAula.Aulas);
            })

      }
    } else {// Subtracts to attendance
        if (this.alunosDaAula[pos].Contador > 0) {
          console.log("Vou diminuir a contador")
          var subtract = this.alunosDaAula[pos].Contador - 1;
          this.alunosDaAula[pos].Contador = subtract;
          // Update service
          let pessoaAula =  {
            Pessoas: this.alunosDaAula[pos].Pessoas.id,
            Aulas: this.alunosDaAula[pos].Aulas.id,
            Contador: this.alunosDaAula[pos].Contador
          }
  
          this.service.updateCurrentAttendance(this.alunosDaAula[pos].id, pessoaAula).subscribe(result => {
                console.log("UPDATE DE PRESENCA - presente")
                console.log(result);
                this.populateStudents(pessoaAula.Aulas);
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

      this.alunosDaAula = []; // <= CHECK THIS
      this.expansionAux = idAula

      this.service.getPessoaAulaDaAula(idAula).subscribe(
        (relacoes) => {
          let parsed = JSON.parse(JSON.stringify(relacoes));
          this.alunosDaAula = parsed;
          console.log("TESTE IMPORTANTE---------------------");
          console.log(parsed);
          console.log(this.alunosDaAula)
        console.log("RELACAO")
        console.log(relacoes)}, // on Success
        (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
        () => { // Once completed
        }
         );

      console.log("ALUNOS GERAL: ")
      console.log(this.alunosDaAula)
      this.spinner.hide();
  }

  expandCollapse(idAula){
    return idAula == this.expansionAux
    }
  }


