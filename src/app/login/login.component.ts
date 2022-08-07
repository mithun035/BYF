import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, Validators, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from "../api.service";
import { ILogin } from "../ILogin";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    hide: boolean = true;
    showError: boolean = false;
    constructor(
        private apiService: ApiService,
        private router: Router,
        private cookie: CookieService) { 
            const token = this.cookie.get("token");
            if(token)
            {
                this.router.navigate(['/home']);
            }
        }

    ngOnInit(): void {
        this.loginForm = new UntypedFormGroup(
            {
                userName: new FormControl('',Validators.required),
                password: new FormControl('',Validators.required)
            }
        );
        this.showError = false;
    }

    onSubmit(){
        console.log('Hi I Work!',this.loginForm.value);
        const userName = this.loginForm.value.userName;
        const password = this.loginForm.value.password;
        const body = { Username: userName, Password: password };
        this.apiService.loginUser(body).
        subscribe({
            next: (data: ILogin) => {
                this.cookie.set('token',data.token);
                console.log(data);
            },
            error: (err) => {
                console.log(err);
                this.showError = true;
            },
            complete: () => {
                this.router.navigate(['/home']);
            }
        })
    }
}