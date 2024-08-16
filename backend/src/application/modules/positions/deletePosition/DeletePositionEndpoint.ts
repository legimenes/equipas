import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import { Request, Response } from "express";
import Result from "@domain/core/Result";
import IDeletePosition from "./IDeletePosition";

@injectable()
export default class DeletePositionEndpoint {
  constructor(@inject(TYPES.IDeletePosition) readonly useCase: IDeletePosition) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      
      const result: Result<boolean> = await this.useCase.execute(parseInt(id));

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
