import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validation = (schema: ZodSchema<any>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parse(request.body);
      next();
    } catch (error) {
      return response.status(400).json({ error });
      //return response.status(400).send(e.errors);
    }
  }

export default validation
