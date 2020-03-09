import { mails } from './../data/mail';
import { Users } from './../data/users';
import { IUser } from './../models/user';
import { Injectable } from '@angular/core';
import { mockKeys } from '../models/objects';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  users: IUser[] = Users;
  mails = mails;
  private activeUser : IUser;

  constructor() {
    if (!this.isKeyExists(mockKeys.USER)) {
      this.objToString(mockKeys.USER, this.users);
    }
    if (!this.isKeyExists(mockKeys.MAIL)) {
      this.objToString(mockKeys.MAIL, this.mails);
    }
  }

  isKeyExists(key: string) {
    return localStorage.getItem(key);
  }

  getAllUsers(): IUser[] {
    return this.parseFromString(mockKeys.USER);
  }

  loginUser(email, password) {
    const allUsers = this.getAllUsers();
    return allUsers.find(x => x.email === email && x.password === password);
  }

  setActiveUser (user: IUser){
    this.activeUser = user;
    return this.activeUser;
  }

  getActiveUser(){
    return this.activeUser;
  }

  parseFromString(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  objToString(key: string, obj: any) {
    return localStorage.setItem(key, JSON.stringify(obj));
  }

  getAllMails() {
    return this.parseFromString(mockKeys.MAIL);
  }

  getMails(page: number, pageCount: number) {
    const allmails = this.sortByDate();
    if (allmails.length > pageCount) {
      return {
        data: Array.from(allmails).splice(page * pageCount, pageCount),
        totalCount: allmails.length
      }
    } else {
      return {
        data: allmails,
        totalCount: allmails.length
      }
    }
  }

  sortByDate(){
    return this.getAllMails().sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  }

  deleteMails(selectedIds) {
    const newlist = this.getAllMails().filter((item) => !selectedIds[item.id]);
    this.objToString(mockKeys.MAIL, newlist);
  }

  addEmail(mail) {
    const allMails = this.getAllMails();
    this.objToString(mockKeys.MAIL, [...allMails, mail]);
  }

  getMaxId() {
    return this.getAllMails().reduce((prev, current) => current.id > prev.id ? current : prev).id;
  }

}
