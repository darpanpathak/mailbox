import { mails } from './../data/mail';
import { Users } from './../data/users';
import { IUser } from './../models/user';
import { Injectable } from '@angular/core';
import { mockKeys } from '../models/objects';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  users: IUser[] = Users;
  mails = mails;

  private unreadCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    if (!this.isKeyExists(mockKeys.USER)) {
      this.objToString(mockKeys.USER, this.users);
    }
    if (!this.isKeyExists(mockKeys.MAIL)) {
      this.objToString(mockKeys.MAIL, this.mails);
    }

    if (this.getActiveUser()) {
      this.setUnreadCount();
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

  logoutUser() {
    localStorage.removeItem(mockKeys.ACTIVE_USER);
    return true;
  }

  setActiveUser(user: IUser) {
    this.objToString(mockKeys.ACTIVE_USER, user);
    return user;
  }

  getActiveUser() {
    return this.parseFromString(mockKeys.ACTIVE_USER);
  }

  parseFromString(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  objToString(key: string, obj: any) {
    const result = localStorage.setItem(key, JSON.stringify(obj));
    this.setUnreadCount();
    return result;
  }

  getAllMails() {
    const allmails = this.parseFromString(mockKeys.MAIL);
    const activeUser = this.getActiveUser();
    return !activeUser ? [] : allmails.filter((item) => {
      return item.to === activeUser.email || item.cc === activeUser.email;
    });
  }

  getMailDetails(id) {
    return this.getAllMails().find(x => x.id === Number(id));
  }

  getMails(page: number, pageCount: number) {
    const allmails = this.sortByDate();
    if (allmails.length > pageCount) {
      return {
        data: Array.from(allmails).splice(page * pageCount, pageCount),
        totalCount: allmails.length
      };
    } else {
      return {
        data: allmails,
        totalCount: allmails.length
      };
    }
  }

  sortByDate() {
    return this.getAllMails().sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
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

  getUnreadMailCount() {
    return this.unreadCount.asObservable();
  }

  setUnreadCount() {
    const newCount = this.getAllMails().filter(item => !item.isRead).length;
    this.unreadCount.next(newCount);
  }

  openMail(id) {
    const allmails = this.getAllMails();
    const objIndex = allmails.findIndex(obj => obj.id === id);
    const updatedObj = { ...allmails[objIndex], isRead: true };
    const updatedMails = [
      ...allmails.slice(0, objIndex),
      updatedObj,
      ...allmails.slice(objIndex + 1),
    ];

    this.objToString(mockKeys.MAIL, updatedMails);
  }

}
