import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss']
})
export class ReadMailComponent implements OnInit {
  id: number;
  mail;
  constructor(private aRoute: ActivatedRoute, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.aRoute.params.subscribe((param) => {
      this.id = param.id;
      this.getMailDetails(this.id);
    });
  }

  getMailDetails(id: number) {
    this.mail = this.localStorageService.getMailDetails(id);
  }

}
