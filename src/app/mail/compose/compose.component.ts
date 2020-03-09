import { LocalStorageService } from './../../shared/services/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      to: [null, [Validators.required]],
      cc: [null],
      subject: [null, [Validators.required]],
      body: [null, Validators.required]
    });
  }

  discard() {
    this.modalRef.hide();
  }

  send() {
    if (this.form.valid) {
      const id = this.localStorageService.getMaxId() + 1;
      const activeUser: IUser = this.localStorageService.getActiveUser();
      const val = {
        ...this.form.value,
        id,
        datetime: new Date(),
        isRead: false,
        firstName: activeUser.firstName,
        lastName: activeUser.lastName,
        from: activeUser.email
      };
      this.localStorageService.addEmail(val);
      this.toastr.success('Mail Sent');
      this.form.reset();
      this.modalRef.hide();
    }
  }

}
