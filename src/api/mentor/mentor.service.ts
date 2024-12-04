import { Injectable } from '@nestjs/common';
import  {RepositoriesService} from '../../repositories/repositories.service';

@Injectable()
export class MentorService {
  constructor(private repo : RepositoriesService  ) {
  }

  async getMentors() {
    return this.repo.user.findUserByLevel('mentor');
  }
}
