import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import GetPositionByIdResponse from "./GetPositionByIdResponse";
import IGetPositionById from "./IGetPositionById";

@injectable()
export default class GetPositionByIdEndpoint {
  constructor(@inject(TYPES.IGetPositionById) readonly query: IGetPositionById) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;

      const result: Result<GetPositionByIdResponse | undefined> = await this.query.get(parseInt(id));      
      if (result.isFailure) {
        response.status(422).json(result);
      }

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
