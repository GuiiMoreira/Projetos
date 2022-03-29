import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const loggerMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    const value = await next();
    console.log(value);
    return value;
};
// Esse midleware apenas retorna o valor recebido e mostra ele no console.



export const dateFormatMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    const value = await next();

    return new Date(value).toLocaleDateString();
};
// Esse midleware formata o valor de data recebido e mostra ele na query.
