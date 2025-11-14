import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith('/admin')) {
    const newPath = pathname.replace('/admin', '/keystatic');
    
    return context.rewrite(new URL(newPath, context.request.url));
  }

  return next();
});
