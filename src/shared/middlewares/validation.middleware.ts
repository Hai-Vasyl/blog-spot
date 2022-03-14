import {
  NestMiddleware,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class ValidationMiddleware implements NestMiddleware {
  protected readonly dto: any;

  public async use(req: Request, _res: Response, next: NextFunction) {
    Object.assign(this.dto, req.body);

    const errors = await validate(this.dto);

    if (errors?.length) {
      const errorsMapped = errors.map((error: ValidationError) => {
        const messageKey = Object.keys(error.constraints)[0];

        return {
          field: error.property,
          message: error.constraints[messageKey],
        };
      });

      throw new UnprocessableEntityException(errorsMapped);
    }

    next();
  }
}
