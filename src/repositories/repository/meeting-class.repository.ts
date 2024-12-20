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
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_media_id: true,
            avatar_path: true,
          },
        },
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
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_media_id: true,
            avatar_path: true,
          },
        },
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

  async findClassByUserAssign(user_id: string) {
    const user_assign = await this.prisma.class_user.findMany({
      where: {
        user_id,
      },
    });

    const meeting_class_ids = user_assign.map((item) => item.class_id);

    return await this.table.findMany({
      where: {
        id: {
          in: meeting_class_ids,
        },
      },
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_media_id: true,
            avatar_path: true,
          },
        },
      },
    });
  }

  async findClassByUserMentor(user_id: string) {
    return this.table.findMany({
      where: {
        mentor_id: user_id,
      },
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            avatar_media_id: true,
            avatar_path: true,
          },
        },
      },
    });
  }

  async joinMeeting(class_id: string, user_id: string) {
    const user_assign = await this.prisma.class_user.findFirst({
      where: {
        user_id: user_id,
        class_id: class_id
      }
    });
    if (user_assign) {
      return await this.prisma.class_user.update({
        where: {
          id: user_assign.id
        },
        data: {
          has_join: true
        }
      })
    }
    return null;
  }

  async checkJoinMeetingClassMurid(class_id: string, user_id: string) {
    const user_assign = await this.prisma.class_user.findFirst({
      where: {
        user_id: user_id,
        class_id: class_id
      }
    });
    if (user_assign) {
      return await this.table.findFirst({
        where: {
          id: class_id
        },
        include: {
          zoom: true,
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
              avatar_media_id: true,
              avatar_path: true,
              user_type: true,
              created_at: true,
              is_active: true,
              profession: true,
              description: true,
              about: true,
              medsos_facebook: true,
              medsos_instagram: true,
              medsos_linkedin: true,
              medsos_wa: true
            }
          }
        }
      })
    }
    return null;
  }

  async checkJoinMeetingClassMentor(class_id: string, user_id: string) {
    return await this.table.findFirst({
      where: {
        id: class_id,
        mentor_id: user_id
      },
      include: {
        zoom: true,
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            avatar_media_id: true,
            avatar_path: true,
            user_type: true,
            created_at: true,
            is_active: true,
            profession: true,
            description: true,
            about: true,
            medsos_facebook: true,
            medsos_instagram: true,
            medsos_linkedin: true,
            medsos_wa: true
          }
        }
      }
    })
  }
}
