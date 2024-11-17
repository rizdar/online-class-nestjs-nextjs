import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  get table() {
    return this.prisma.users;
  }

  async findUserByEmail(email: string) {
    return await this.table.findFirst({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return await this.table.findFirst({
      where: {
        id,
        is_active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        user_type: true,
        created_at: true,
        is_active: true,
      },
    });
  }

  async findAllUsers() {
    return await this.table.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        user_type: true,
        created_at: true,
        is_active: true,
      },
      where: {
        is_active: true,
      },
    });
  }

  async activateByEmail(email: string) {
    const data = await this.findUserByEmail(email);

    if (data) {
      const updatedUser = await this.table.update({
        where: {
          id: data.id,
        },
        data: {
          is_active: true,
        },
      });
      if (updatedUser) {
        return true;
      }
    }

    return false;
  }

  async updateUserByID(id: string, data: Prisma.usersUpdateInput) {
    return await this.table.update({
      where: {
        id,
      },
      data,
    });
  }

  async create(data: Prisma.usersCreateInput) {
    return await this.table.create({
      data: data,
    });
  }
}
