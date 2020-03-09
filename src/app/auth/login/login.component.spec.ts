import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { By } from '@angular/platform-browser';

class ToastrServiceMock {
  constructor() { }
  success() { }
  error() { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastr: ToastrService;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, ToastrModule],
      providers: [LocalStorageService, { provide: ToastrService, useClass: ToastrServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toastr = TestBed.get(ToastrService);
    localStorageService = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the login-page class from the body', () => {
    component.ngOnDestroy();
    const el = fixture.debugElement.query(By.css('login-page'));
    expect(el).toBeFalsy();
  });

  it('should show the error from toastr if form is invalid', () => {
    spyOn(toastr, 'error').and.callThrough();
    component.form.patchValue({ email: null, password: '' });
    component.doLogin(component.form);
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should show the error from toastr if form is valid but the username or password does not exists', () => {
    spyOn(toastr, 'error').and.callThrough();
    component.form.patchValue({ email: 'dfadsa', password: 'dasd' });
    component.doLogin(component.form);
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should show the success from toastr, set active user if everything is fine', () => {
    spyOn(toastr, 'success').and.callThrough();
    spyOn(localStorageService, 'setActiveUser').and.callThrough();
    spyOn(router, 'navigate').and.stub();
    component.form.patchValue({ email: 'pathakdarpan77@gmail.com', password: 'darpan123' });
    component.doLogin(component.form);
    expect(toastr.success).toHaveBeenCalled();
    expect(localStorageService.setActiveUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['mail', 'inbox']);
  });

});
