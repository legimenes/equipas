import { CreatePlayerInput } from "@application/ports/driver/CreatePlayerInput";
import ICreatePlayer from "@application/ports/driver/ICreatePlayer";
import { Request, Response } from 'express';

export default class PlayerController {
  constructor(readonly createPlayer: ICreatePlayer) {
  }

  async create(request: Request, response: Response): Promise<void> {
    try {
      const body: any = request.body;

      const input: CreatePlayerInput = { 
        name: body.name,
        level: body.level,
        position: body.position
      };

      const result: boolean = await this.createPlayer.execute(input);

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
