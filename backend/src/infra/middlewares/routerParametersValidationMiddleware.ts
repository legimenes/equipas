import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import Result from '@domain/core/Result';

interface ValidationSchemas {
  parametersSchema?: ZodSchema<any>;
  bodySchema?: ZodSchema<any>;
}

const routerParametersValidation =
    ( { parametersSchema, bodySchema }: ValidationSchemas ) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (parametersSchema) {
        await parametersSchema.parse(request.params);
      }

      if (bodySchema) {
        await bodySchema.parse(request.body);
      }

      next();
    } catch (error) {
      let errorMessages: string[] = [];
      if (error instanceof ZodError) {
        errorMessages = handleZodErrorMessages(error);
      }
      else {
        errorMessages = ["Unknown error"]
      }

      const failureResult = Result.failure(errorMessages);
      return response.status(400).json(failureResult);
    }
  }

function handleZodErrorMessages(error: ZodError): string[] {
  const errorMessages: string[] = [];
  error.errors.forEach(zodError => {
    errorMessages.push(zodError.message);
  });

  return errorMessages;
}

export default routerParametersValidation
