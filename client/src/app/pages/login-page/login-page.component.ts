import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import route from '../../constants/routes';

// import { AlertService, AuthenticationService } from '@/_services';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    disabledButton: false;
    submitted = false;
    returnUrl: string;

    constructor(
        private spinner: NgxSpinnerService,
        // private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        private router: Router,
        // private authenticationService: AuthenticationService,
        // private alertService: AlertService
    ) {
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
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    pushToRegisterPage() {
        
        // this.router.navigate([route.REGISTER_PAGE]);
    }

    onSubmit() {
        // if some validator, triggers, render button inactive until it is solved
        console.log('Submited!');
        // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //    return;
        // }        
        this.spinner.show(undefined,
            {
              type: 'pacman',
              size: 'medium',
              bdColor: 'rgba(100,149,237, .1)',
              color: 'yellow',
              fullScreen: true
            }
          );
        setTimeout(() => {
            this.spinner.hide();
        }, 3000);

       /*
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
                */
    }
}
