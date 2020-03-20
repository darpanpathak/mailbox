import { ComposeComponent } from './compose/compose.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  unreadCount = this.localStorageService.getUnreadMailCount();
  deleteCount = this.localStorageService.getDeleteCount();
  constructor(private modalService: BsModalService, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
  }

  compose() {
    this.modalService.show(ComposeComponent, { class: 'modal-lg', backdrop: 'static' });
  }

  doLogOut(e) {
    this.localStorageService.logoutUser();
    this.router.navigate(['auth', 'login']);
  }

}
