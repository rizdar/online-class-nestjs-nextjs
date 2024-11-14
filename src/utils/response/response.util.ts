import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseModel } from 'src/model/response.model';

@Injectable()
export class ResponseUtil {
  constructor(@Inject(REQUEST) private readonly req: Request = null) {}

  async json({ statusCode, data, message }: ResponseModel) {
    this.req.res && this.req.res.status(statusCode ?? 200);
    return {
      statusCode: statusCode ?? 200,
      message: message ?? ' ',
      data: data ?? [],
    };
  }
}
