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
    return await this.table.findMany({
      where: {
        is_deleted: false,
      },
      include: {
        class_user: {
          select: {
            user_id: true,
            class_id: true,
            has_join: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findByID(id: string) {
    return await this.table.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      include: {
        class_user: {
          select: {
            user_id: true,
            class_id: true,
            has_join: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
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

  async addUser(meeting_id: string, user_id: string) {
    const checkUser = await this.prisma.class_user.findFirst({
      where: {
        user_id: user_id,
        class_id: meeting_id,
      },
    });
    if (!checkUser) {
      return await this.prisma.class_user.create({
        data: {
          user_id: user_id,
          class_id: meeting_id,
        },
      });
    }
  }

  async removeUser(meeting_id: string, user_id: string) {
    const checkUser = await this.prisma.class_user.findFirst({
      where: {
        user_id: user_id,
        class_id: meeting_id,
      },
    });
    if (checkUser) {
      return await this.prisma.class_user.delete({
        where: {
          id: checkUser.id,
        },
      });
    }
  }
}
