import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  private readonly PAGE_COUNT = 10;
  mailList = [];
  page: number = 0;
  form: FormGroup;
  totalCount: number = 0;

  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private toastr: ToastrService) {

  }

  createForm() {
    this.form = this.fb.group({
      mails: this.fb.array([])
    });
  }

  get mails(): FormArray {
    return this.form.get('mails') as FormArray;
  }

  ngOnInit() {
    this.getMails();
  }

  getMails() {
    const mailsObj = this.localStorageService.getMails(this.page, this.PAGE_COUNT);
    this.mailList = mailsObj.data;
    this.totalCount = mailsObj.totalCount;
    this.createForm();
    this.updateFormWithMails();
  }

  updateFormWithMails() {
    this.mailList.forEach((item) => {
      this.mails.push(this.fb.group({ ...item, isChecked: false }));
    });
  }

  next() {
    if ((this.PAGE_COUNT * (this.page + 1)) < this.totalCount) {
      this.page++;
      this.getMails();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.getMails();
    }
  }

  delete() {
    const selectedMails = {};
    this.mails.value.forEach(item => {
      if (item.isChecked)
        selectedMails[item.id] = item.isChecked;
    });
    this.localStorageService.deleteMails(selectedMails);
    this.toastr.success('Success', 'Mails removed');
    this.getMails();
  }

}
