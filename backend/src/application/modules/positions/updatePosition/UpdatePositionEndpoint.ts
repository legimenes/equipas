import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infra/di/types';
import Result from '@domain/core/Result';
import UpdatePositionRequest from './UpdatePositionRequest';
import IUpdatePosition from './IUpdatePosition';

@injectable()
export default class UpdatePositionEndpoint {
  constructor(@inject(TYPES.IUpdatePosition) readonly useCase: IUpdatePosition) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      const useCaseRequest: UpdatePositionRequest = request.body;
      
      const result: Result<boolean> = await this.useCase.execute(parseInt(id), useCaseRequest);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
