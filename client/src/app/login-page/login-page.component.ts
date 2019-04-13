import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';
//import {  AuthenticationService } from '@/_services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        // private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        // private router: Router,
        // private authenticationService: AuthenticationService,
        // private alertService: AlertService
    )  {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        //  }
    }

    ngOnInit() {
        // this.loginForm = this.formBuilder.group({
        //     username: ['', Validators.required],
        //     password: ['', Validators.required]
        // });

        // get return url from route parameters or default to '/'
        //this.returnUrl = " ";
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    onclickLogin() {
        this.loading = true;
        console.log('Fazer login!!');
        //validar campos
        // - se existe senha
        // - se existe usuário
        //conectar ao service
        // autenticar
        // se sucesso, /router para home
        // se falha, exibir erro [erro de usuário/senha]
    }

    onclickForgot() {
        console.log("Esqueci a senha!");
    }
}
