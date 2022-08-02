import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
        this.loginForm = new FormGroup(
            {
                userName: new FormControl('',Validators.required),
                password: new FormControl('',Validators.required)
            }
        );
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
                console.log("login failed");
            },
            complete: () => {
                this.router.navigate(['/home']);
            }
        })
    }
}