import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxComponent } from './inbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Users } from 'src/app/shared/data/users';
import { Router } from '@angular/router';

class ToastrServiceMock {
  constructor() { }
  success() { }
  error() { }
}

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let toastr: ToastrService;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InboxComponent],
      imports: [FormsModule, ReactiveFormsModule, SharedModule, RouterTestingModule],
      providers: [{ provide: ToastrService, useClass: ToastrServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    toastr = TestBed.get(ToastrService);
    localStorageService = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
    fixture.detectChanges();

    localStorageService.setActiveUser(Users[0]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the mails from existing storage', () => {
    component.page = 0;
    component.getMails();
    expect(component.mailList.length).toBe(10);
  });

  it('should increase the page by 1', () => {
    component.page = 0;
    component.next();
    expect(component.page).toBe(1);
  });

  it('should not increase the page count if it reaches max', () => {
    component.page = 3;
    component.next();
    expect(component.page).toBe(3);
  });

  it('should decrease the page by 1', () => {
    component.page = 1;
    component.prev();
    expect(component.page).toBe(0);
  });

  it('should not increase the page count if it reaches min', () => {
    component.page = 0;
    component.prev();
    expect(component.page).toBe(0);
  });

  it('should delete the emails from storage', () => {
    component.getMails();
    const frmArr = component.mails;
    frmArr.at(0).patchValue({ ...frmArr.value[0], isChecked: true });
    spyOn(localStorageService, 'deleteMails').and.callThrough();
    spyOn(toastr, 'success').and.callThrough();
    component.delete();
    expect(localStorageService.deleteMails).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalled();
  });

  it('should call openmail from localstorage on openMail function call', () => {
    spyOn(localStorageService, 'openMail').and.callThrough();
    spyOn(router, 'navigate').and.stub();
    component.openMail(4);
    expect(localStorageService.openMail).toHaveBeenCalledWith(4);
    expect(router.navigate).toHaveBeenCalledWith(['mail', 'read', 4]);
  });

});
