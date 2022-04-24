import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AttendeeEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.attendee;
  }
);
