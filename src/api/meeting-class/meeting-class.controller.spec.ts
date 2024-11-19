import { Test, TestingModule } from '@nestjs/testing';
import { MeetingClassController } from './meeting-class.controller';
import { MeetingClassService } from './meeting-class.service';

describe('MeetingClassController', () => {
  let controller: MeetingClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingClassController],
      providers: [MeetingClassService],
    }).compile();

    controller = module.get<MeetingClassController>(MeetingClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
