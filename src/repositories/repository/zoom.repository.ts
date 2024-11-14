import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ZoomRepository {
  constructor(private prisma: PrismaService) {}

  get table() {
    return this.prisma.zoom;
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

  async create(data: Prisma.zoomCreateInput) {
    return this.table.create({
      data,
    });
  }

  async update(id: string, data: Prisma.zoomUpdateInput) {
    const checkZoom = await this.findByID(id);

    if (checkZoom) {
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
