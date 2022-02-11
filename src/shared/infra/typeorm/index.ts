import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  Object.assign(defaultOptions, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host,

    database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database,
  });

  const connection = createConnection(defaultOptions);

  return connection;
};
