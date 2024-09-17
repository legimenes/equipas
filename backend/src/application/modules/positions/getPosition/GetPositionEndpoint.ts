import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import GetPositionResponse from "./GetPositionResponse";
import IGetPosition from "./IGetPosition";

@injectable()
export default class GetPositionEndpoint {
  constructor(@inject(TYPES.IGetPosition) readonly query: IGetPosition) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;

      const result: Result<GetPositionResponse | undefined> = await this.query.get(parseInt(id));
      if (result.isFailure) {
        response.status(422).json(result);
      }

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
