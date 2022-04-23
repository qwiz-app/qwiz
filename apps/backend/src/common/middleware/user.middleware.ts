import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { PrismaService } from '../../prisma.service';

import { getFromCookie } from '../../lib/utils';

import { AuthRequest } from '../../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const { cookie } = req.headers;

    const sessionToken = getFromCookie(cookie, 'next-auth.session-token');

    if (sessionToken) {
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              organization: true,
              attendee: true,
            },
          },
        },
      });

      if (session) {
        const { user } = session;

        if (!user) {
          throw new NotFoundException('User not found.');
        }

        req.user = user;

        console.log('req.user :>> ', req.user.attendee);

        next();
      } else {
        throw new UnauthorizedException('Session not found.');
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
