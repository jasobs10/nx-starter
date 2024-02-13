import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SchemaValidationError } from './errors/schema-validation.error';

export function validateSchema<TSchema extends object>(
  SchemaClass: ClassConstructor<TSchema>,
  schemaObj: Record<string, unknown>
): TSchema {
  const instance = plainToInstance(SchemaClass, schemaObj, {
    enableImplicitConversion: false
  });

  const errors = validateSync(instance, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new SchemaValidationError(errors.toString());
  }

  return instance;
}
