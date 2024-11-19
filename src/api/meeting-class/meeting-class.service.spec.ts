import { Test, TestingModule } from '@nestjs/testing';
import { MeetingClassService } from './meeting-class.service';

describe('MeetingClassService', () => {
  let service: MeetingClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingClassService],
    }).compile();

    service = module.get<MeetingClassService>(MeetingClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
