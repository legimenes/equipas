import { CreatePlayerInput } from "@application/ports/driver/CreatePlayerInput";

export default interface ICreatePlayer {
  execute(input: CreatePlayerInput): Promise<boolean>;
}
