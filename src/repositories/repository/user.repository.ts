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
      },
    });
  }

  async findAllUsers() {
    return await this.table.findMany();
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
}
