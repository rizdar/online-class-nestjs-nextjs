import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeetingClassRepository {
  constructor(private prisma: PrismaService) {}

  get table() {
    return this.prisma.meeting_class;
  }

  async findAll() {
    return await this.table.findMany();
  }

  async findByID(id: string) {
    return await this.table.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.meeting_classCreateInput) {
    return this.table.create({
      data,
    });
  }

  async update(id: string, data: Prisma.meeting_classUpdateInput) {
    const checkMeeting = await this.findByID(id);

    if (checkMeeting) {
      return await this.table.update({
        where: {
          id,
        },
        data,
      });
    }

    return null;
  }
}
