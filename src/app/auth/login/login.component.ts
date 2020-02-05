import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;
  result: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  loginUser() {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this.authService.authenticate(email, password).subscribe((data => {
      if(data.success) {
        this.authService.setLoggedInUser(data.user);
        this.router.navigate(['admin']);
      } else {
        this.errorMsg = data.message;
      }
    })
    )
  }
  
}
