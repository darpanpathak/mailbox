
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  doLogin(form: FormGroup) {
    if (form.valid) {
      const isLoginSuccess = this.localStorageService.loginUser(form.value.email, form.value.password);
      if (isLoginSuccess) {
        this.toastr.success('Success', 'Logged in Successfully');
        this.localStorageService.setActiveUser(isLoginSuccess);
        this.router.navigate(['mail', 'inbox']);
      } else {
        this.toastr.error('Error', 'Entered email or password is incorrect');
      }
    } else {
      this.toastr.error('Error', 'Form is invalid');
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

}
