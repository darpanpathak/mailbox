import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() unread = 0;
  @Output() signout = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  signOut() {
    this.signout.emit(true);
  }
}
