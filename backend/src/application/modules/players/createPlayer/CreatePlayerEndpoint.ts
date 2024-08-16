import { Request, Response } from 'express';
import Result from '@domain/core/Result';
import CreatePlayerRequest from './CreatePlayerRequest';
import ICreatePlayerUseCase from "./ICreatePlayerUseCase";

export default class CreatePlayerEndpoint {
  constructor(readonly useCase: ICreatePlayerUseCase) {
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const body: any = request.body;

      const input: CreatePlayerRequest = { 
        name: body.name,
        level: body.level,
        position: body.position
      };

      const result: Result<boolean> = await this.useCase.execute(input);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}