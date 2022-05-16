import { Query, Resolver, Ctx } from "type-graphql";
import { Context } from "../types/Context";

@Resolver()
export class HelloResolver {
  @Query((_return) => String)
  hello(@Ctx() { req }: Context) {
    return `Hello ${req.session.userId}`;
  }
}
