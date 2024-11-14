import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { MeetingClassRepository } from './repository/meeting-class.repository';
import { ZoomRepository } from './repository/zoom.repository';

@Injectable()
export class RepositoriesService {
  constructor(
    private _user: UserRepository,
    private _meetingClass: MeetingClassRepository,
    private _zoom: ZoomRepository,
  ) {}

  get user() {
    return this._user;
  }

  get meetingClass() {
    return this._meetingClass;
  }

  get zoom() {
    return this._zoom;
  }
}
