import { Field, ObjectType } from "type-graphql";

@ObjectType()
export abstract class UploadResult {
  @Field()
  url: string;
}
