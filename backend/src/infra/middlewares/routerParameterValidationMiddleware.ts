import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import Result from '@domain/core/Result';

const validation = (schema: ZodSchema<any>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parse(request.body);
      next();
    } catch (error) {
      let errorMessages: string[] = [];
      if (error instanceof ZodError) {
        errorMessages = handleZodErrorMessages(error);
      }
      else {
        errorMessages = ["Unknwon error"]
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

export default validation
