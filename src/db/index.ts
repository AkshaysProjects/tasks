import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { env } from "../env";
import { Task } from "./entities/Task";
import { User } from "./entities/User";

const dataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  entities: [User, Task],
  synchronize: true,
});

export const getRepository = <T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Repository<T> => {
  return dataSource.getRepository<T>(entity);
};

export default dataSource;
