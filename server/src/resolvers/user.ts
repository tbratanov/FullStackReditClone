import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class usernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('options') options: usernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {username: options.username, password: hashedPassword});
        await em.persistAndFlush(user);
        return user;
    }

    @Mutation(() => User)
    async login(
        @Arg('options') options: usernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const user = await em.findOneOrFail(User, {username: options.username});
        if(!user) {
            return {
                errors: []
            }
        }
        const hashedPassword = await argon2.hash(options.password);
        await em.persistAndFlush(user);
        return user;
    }
}