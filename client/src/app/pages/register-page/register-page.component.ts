import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  loading = false;
  constructor(private service: AuthService) { }

  ngOnInit() {

    // get courses info from the server
    this.service.postNewPerson("NOME", "SENHA", "GMAIL", "19997711700").subscribe(
      () => { console.log("PARTE A"); }, // on Success
      (error) => {console.log("ERROR! --postNewPerson")}, // error
      () => { // Once completed
        console.log("PARTE B");
        // this.getAulasComFalta(id);
        // for (let turma of this.turmasAluno){
        //   this.getAulasAluno(turma.id);
        // } 

      }
       );;
  }

  onClickSubmit(){
    this.loading = true;
    //send to server
    // if sucess, move to home to pending approval
  }

}
