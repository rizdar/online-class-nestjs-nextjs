import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { MeetingClassRepository } from './repository/meeting-class.repository';

@Injectable()
export class RepositoriesService {
  constructor(
    private _user: UserRepository,
    private _meetingClass: MeetingClassRepository,
  ) {}

  get user() {
    return this._user;
  }

  get meetingClass() {
    return this._meetingClass;
  }
}
