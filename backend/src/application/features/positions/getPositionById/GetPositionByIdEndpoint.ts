import { Request, Response } from 'express';
import Result from '@domain/core/Result';
import GetPositionByIdResponse from './GetPositionByIdResponse';
import IGetPositionByIdQuery from './IGetPositionByIdQuery';

export default class GetPositionByIdEndpoint {
  constructor(readonly query: IGetPositionByIdQuery) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;

      const result: Result<GetPositionByIdResponse> = await this.query.get(parseInt(id));
      
      if (result.isFailure) {
        response.status(422).json(result);
      }

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
