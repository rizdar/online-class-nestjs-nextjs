import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class RepositoriesService {
  constructor(private _user: UserRepository) {}

  get user() {
    return this._user;
  }
}
