import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailComponent } from './mail.component';
import { MockComponent } from 'ng-mocks';
import { SidebarComponent } from '../shared/modules/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/modules/navbar/navbar.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { LocalStorageService } from '../shared/services/local-storage.service';

class MockModalService {
  show() {

  }
}

describe('MailComponent', () => {
  let component: MailComponent;
  let fixture: ComponentFixture<MailComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;
  let modalService: BsModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MailComponent,
        MockComponent(SidebarComponent),
        MockComponent(NavbarComponent)
      ],
      imports: [
        RouterTestingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
      ],
      providers: [LocalStorageService, { provide: BsModalService, useClass: MockModalService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
    modalService = TestBed.get(BsModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the show method of the modal Service on click of compose button', () => {
    spyOn(modalService, 'show').and.callThrough();
    component.compose();
    expect(modalService.show).toHaveBeenCalled();
  });

  it('should call the logout user and routing to login on click of logout button', () => {
    spyOn(localStorageService, 'logoutUser').and.callThrough();
    spyOn(router, 'navigate').and.stub();
    component.doLogOut('');
    expect(localStorageService.logoutUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['auth', 'login']);
  });
});
