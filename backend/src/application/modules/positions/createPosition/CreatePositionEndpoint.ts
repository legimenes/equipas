import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import CreatePositionRequest from "./CreatePositionRequest";
import ICreatePosition from "./ICreatePosition";

@injectable()
export default class CreatePositionEndpoint {
  constructor(@inject(TYPES.ICreatePosition) readonly useCase: ICreatePosition) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const useCaseRequest: CreatePositionRequest = request.body;
      
      const result: Result<boolean> = await this.useCase.execute(useCaseRequest);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
