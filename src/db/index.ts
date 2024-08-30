import { DataSource } from "typeorm";
import { env } from "../env";

const dataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  entities: ["src/db/entities/*.js"],
  synchronize: true,
});

export default dataSource;
