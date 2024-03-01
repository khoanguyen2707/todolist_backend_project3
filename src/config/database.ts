import { DataSource } from "typeorm";
import { TaskSchema } from "../models/TaskSchema";

export const dataSource = new DataSource({
    type: 'mysql',
    port: 3306,
    username: "root",
    password: "password",
    database: "todo",
    synchronize: true,
    entities: [TaskSchema],
});
dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
