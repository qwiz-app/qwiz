import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import { PrismaService } from '../../prisma.service';

import { getFromCookie } from '../../lib/utils';

import { AuthRequest } from '../../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const cookies = req.headers.cookie;
    const cookie = getFromCookie(cookies, 'next-auth.session-token');

    if (cookie) {
      const session = await this.prisma.session.findUnique({
        where: {
          sessionToken: cookie,
        },
        include: {
          user: true,
        },
      });

      const { user } = session;

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;

      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
