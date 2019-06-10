import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
import { IdSelectorService} from '../../services/id-selector.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { parse } from 'url';

@Component({
  selector: 'app-add-student-single-class',
  templateUrl: './add-student-single-class.component.html',
  styleUrls: ['./add-student-single-class.component.css']
})
export class AddStudentSingleClassComponent implements OnInit {

  alunos;

  constructor(private service: AuthService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private shared: IdSelectorService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.getAllAlunos();
  }

  // --SERVICE METHODS--
  // Calls service to get "cursos"
  getAllAlunos(): void{
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

    this.service.getAllAlunos().subscribe(
      (resultado) => { 
        let parsed = JSON.parse(JSON.stringify(resultado));
        this.alunos = parsed;
       }, // on Success
      (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
      () => { // Once completed
        console.log("Alunos do servidor: ");
        console.log(this.alunos);
        this.spinner.hide();
      }
       );
  }

  addAlunoToClass(alunoId){
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

    this.service.getPresencaEmAula(alunoId, this.shared.getData()).subscribe(
      (resultado) => { 
        console.log(resultado)
        let parsed = JSON.parse(JSON.stringify(resultado));
        console.log("PARSED")
        console.log(parsed)
        // this.alunos = parsed;
        if (parsed.length === 0) {
          let pessoaAula =  {
            Pessoas: alunoId,
            Aulas: this.shared.getData(),
            Contador: 0
          }
  
          this.service.postNewAlunoInAula(pessoaAula).subscribe(result => {
                console.log("ALUNO PODE ASSISTIR ESSA AULA!")
                console.log("RESULTADO:")
                console.log(result);
                this.spinner.hide();
              })
        } else {
          this.spinner.hide();
          window.alert("Aluno já possui essa aula!");
          // this.spinner.hide();
        }
       }, // on Success
      (error) => {console.log("ERROR! --getTurmasDoColaborador")}, // error
      () => { // Once completed
        this.spinner.hide();
      }
       );
  }

}