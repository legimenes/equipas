import PgPromiseAdapter from "./connection/PgPromiseAdapter";

const databaseConnection = new PgPromiseAdapter();

export { databaseConnection };
