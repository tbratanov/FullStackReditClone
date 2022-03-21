import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
const main = async () => {
    console.log(microConfig.password)
    const orm = await MikroORM.init(microConfig);
    // orm.getMigrator().up();

    const posts = await orm.em.find(Post, {})
    console.log(posts)

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false 
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });
    const expressPort = 4000;

    // app.get('/', (_, res) => {
    //     res.send('Hello');
    // })

    app.listen(expressPort, () => {
        console.log(`server started on localhost: ${expressPort}`)
    });
};

main();