import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Organization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.organization;
  }
);
