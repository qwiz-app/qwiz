import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { PrismaService } from '../../prisma.service';

import { getFromCookie } from '../../lib/utils';

import { AuthRequest } from '../../types';

const isVercelEnv = () => process.env.VERCEL === '1';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const { cookie } = req.headers;

    const sessionToken = getFromCookie(
      cookie,
      isVercelEnv()
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token'
    );

    if (sessionToken) {
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            // TODO: should we include on every request,
            // or should we check specific router,
            // or should we not include at all?
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

        next();
      } else {
        throw new UnauthorizedException('Session not found.');
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
