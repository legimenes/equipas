import { Container } from "inversify";
import { TYPES } from "./types";
import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import PgPromiseAdapter from "@infra/data/connection/PgPromiseAdapter";

import IPositionRepository from "@domain/repositories/IPositionRepository";
import PositionRepository from "@infra/data/repositories/PositionRepository";
import ICreatePosition from "@application/modules/positions/createPosition/ICreatePosition";
import CreatePosition from "@application/modules/positions/createPosition/CreatePosition";
import CreatePositionEndpoint from "@application/modules/positions/createPosition/CreatePositionEndpoint";
import IUpdatePosition from "@application/modules/positions/updatePosition/IUpdatePosition";
import UpdatePosition from "@application/modules/positions/updatePosition/UpdatePosition";
import UpdatePositionEndpoint from "@application/modules/positions/updatePosition/UpdatePositionEndpoint";
import IDeletePosition from "@application/modules/positions/deletePosition/IDeletePosition";
import DeletePosition from "@application/modules/positions/deletePosition/DeletePosition";
import DeletePositionEndpoint from "@application/modules/positions/deletePosition/DeletePositionEndpoint";
import IGetPositionById from "@application/modules/positions/getPositionById/IGetPositionById";
import GetPositionById from "@application/modules/positions/getPositionById/GetPositionById";
import GetPositionByIdEndpoint from "@application/modules/positions/getPositionById/GetPositionByIdEndpoint";

const container = new Container();

container.bind<IDatabaseConnection>(TYPES.IDatabaseConnection).to(PgPromiseAdapter).inSingletonScope();
container.bind<IPositionRepository>(TYPES.IPositionRepository).to(PositionRepository).inRequestScope();
container.bind<ICreatePosition>(TYPES.ICreatePosition).to(CreatePosition).inRequestScope();
container.bind(CreatePositionEndpoint).toSelf().inRequestScope;
container.bind<IUpdatePosition>(TYPES.IUpdatePosition).to(UpdatePosition).inRequestScope();
container.bind(UpdatePositionEndpoint).toSelf().inRequestScope;

container.bind<IDeletePosition>(TYPES.IDeletePosition).to(DeletePosition).inRequestScope();
container.bind(DeletePositionEndpoint).toSelf().inRequestScope;

container.bind<IGetPositionById>(TYPES.IGetPositionById).to(GetPositionById).inRequestScope();
container.bind(GetPositionByIdEndpoint).toSelf().inRequestScope;

export { container };
