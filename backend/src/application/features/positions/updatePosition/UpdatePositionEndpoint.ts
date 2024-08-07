import { Request, Response } from 'express';
import Result from '@domain/core/Result';
import UpdatePositionRequest from './UpdatePositionRequest';
import IUpdatePositionUseCase from './IUpdatePositionUseCase';

export default class UpdatePositionEndpoint {
  constructor(readonly useCase: IUpdatePositionUseCase) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      const input: UpdatePositionRequest = request.body;
      
      const result: Result<boolean> = await this.useCase.execute(parseInt(id), input);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
