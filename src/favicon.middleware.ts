import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FaviconMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/favicon.ico') {
      return res.sendStatus(204); // Отправляем статус 204 No Content
    }
    next();
  }
}
