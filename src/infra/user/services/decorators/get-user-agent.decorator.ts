import { UserAgentType } from '@infra/user/types/user-agent.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UAParser } from 'ua-parser-js';

const USER_AGENT = 'user-agent';

export const GetUserAgent = createParamDecorator(
  (_data: any, ctx: ExecutionContext): UserAgentType => {
    GqlExecutionContext.create(ctx).getContext();
    const context = GqlExecutionContext.create(ctx).getContext();
    const headers = context.req.headers;
    const uaParser = new UAParser();

    const userAgent = uaParser.setUA(headers[USER_AGENT]).getResult();

    return {
      name: userAgent?.browser?.name ?? 'Firefox',
      os: (userAgent?.os?.name?.toUpperCase() as any) ?? 'ANDROID',
      type: userAgent?.device?.type ?? 'browser',
      version: userAgent.os.version ?? '86.0.1',
    };
  },
);
