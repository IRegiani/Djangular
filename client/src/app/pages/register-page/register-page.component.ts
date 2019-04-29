import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  loading = false;
  constructor() { }

  ngOnInit() {
    // get courses info from the server
  }

  onClickSubmit(){
    this.loading = true;
    //send to server
    // if sucess, move to home to pending approval
  }

}
