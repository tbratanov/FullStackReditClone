import { Options } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post, User],
    dbName: 'fstk',
    user: "postgres",
    password: "root",
    port: 5432,
    type: 'postgresql',
    debug:  !__prod__
};

export default config;

