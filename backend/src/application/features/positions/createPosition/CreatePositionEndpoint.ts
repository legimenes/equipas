import { Request, Response } from 'express';
import Result from '@domain/core/Result';
import CreatePositionRequest from './CreatePositionRequest';
import ICreatePositionUseCase from './ICreatePositionUseCase';

export default class CreatePositionEndpoint {
  constructor(readonly useCase: ICreatePositionUseCase) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const input: CreatePositionRequest = request.body;
      
      const result: Result<boolean> = await this.useCase.execute(input);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
