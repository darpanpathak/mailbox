import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeComponent } from './compose.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { BsModalService, ModalModule, BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/data/users';

class ToastrServiceMock {
  constructor() { }
  success() { }
  error() { }
}

class MockModalRef {
  hide() { }
}

describe('ComposeComponent', () => {
  let component: ComposeComponent;
  let fixture: ComponentFixture<ComposeComponent>;
  let toastr: ToastrService;
  let localStorageService: LocalStorageService;
  let modalRef: BsModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeComponent],
      imports: [FormsModule, ReactiveFormsModule, CKEditorModule, ModalModule.forRoot()],
      providers: [
        LocalStorageService,
        BsModalService,
        { provide: BsModalRef, useClass: MockModalRef },
        { provide: ToastrService, useClass: ToastrServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeComponent);
    component = fixture.componentInstance;
    toastr = TestBed.get(ToastrService);
    localStorageService = TestBed.get(LocalStorageService);
    modalRef = TestBed.get(BsModalRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoudl call the hide method of the modalref', () => {
    spyOn(modalRef, 'hide').and.callThrough();
    component.discard();
    expect(modalRef.hide).toHaveBeenCalled();
  });

  it('should call the error from toastr if form is invalid and submitted', () => {
    component.form.patchValue({ to: null });
    spyOn(toastr, 'error').and.callThrough();
    component.send();
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should call the success from toastr, addEmail from localStorageService if form is valid and submitted', () => {
    component.form.patchValue({ to: 'pathakdarpan77@gmail.com', subject: 'test', body: 'test' });
    spyOn(toastr, 'success').and.callThrough();
    spyOn(localStorageService, 'addEmail').and.callThrough();
    spyOn(modalRef, 'hide').and.callThrough();
    localStorageService.setActiveUser(Users[0]);
    component.send();
    expect(toastr.success).toHaveBeenCalled();
    expect(localStorageService.addEmail).toHaveBeenCalled();
    expect(modalRef.hide).toHaveBeenCalled();
  });

});
