import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  loading = false;
  constructor(private service : AuthService) { }

  ngOnInit() {
    // get courses info from the server
    let cadastro = {
      Name: "Test",
      Email: "vsdsaajdaskdj",
      Phone: "1213",
      Password: "senha",
      UserType: 0,
      Ativo: 1
      }
    this.service.createNewUser(cadastro).subscribe(pessoa =>
      console.log(pessoa));
  }

  onClickSubmit(){
    this.loading = true;
    //send to server
    // if sucess, move to home to pending approval
  }

}
