import { ComposeComponent } from './compose/compose.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  constructor(private modalService : BsModalService) { }

  ngOnInit() {
  }

  compose(){
    this.modalService.show(ComposeComponent, {class: 'modal-lg', backdrop: 'static'});
  }

}
