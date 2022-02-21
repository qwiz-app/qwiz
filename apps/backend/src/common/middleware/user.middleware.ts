import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { getFromCookie } from '../../lib/utils';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
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

      req.user = user;
    }

    next();
  }
}
