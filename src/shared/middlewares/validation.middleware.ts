import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { validateDto } from '@/shared/helpers/validate-dto';

export class ValidationMiddleware implements NestMiddleware {
  protected readonly dto: any;

  public async use(req: Request, _res: Response, next: NextFunction) {
    await validateDto(this.dto.constructor, req.body);

    next();
  }
}
