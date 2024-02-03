import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export interface RequestContext {
    userId?: string;
}

export const CurrentRequestContext = createParamDecorator((data: unknown, context: ExecutionContext) => {
    return fromExecutionContext(context);
});

export function fromExecutionContext(context: ExecutionContext): RequestContext {
    if ((context.getType<GqlContextType>() as string) === 'graphql') {
        const ctx = GqlExecutionContext.create(context).getContext();
        return ctx.req.user;
    } else {
        return context.switchToHttp().getRequest().user;
    }
}
