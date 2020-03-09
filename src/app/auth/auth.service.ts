import { LocalStorageService } from './../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/user';
import { Users } from '../shared/data/users';

@Injectable()
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  login(email, password){
    return this.localStorageService.loginUser(email, password);
  }
}
