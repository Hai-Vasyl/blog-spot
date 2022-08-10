import { UnprocessableEntityException, ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export async function validateDto(constructor: any, dto: any): Promise<void> {
  const dtoTransformed = plainToInstance(constructor, dto);
  const dtoValidate = new constructor();

  Object.assign(dtoValidate, dtoTransformed);

  const errors = await validate(dtoValidate);

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
}
