import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { AuthModule } from "./auth/auth.module";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { ExploreModule } from "./explore/explore.module";
import { FeedModule } from "./feed/feed.module";
import { PostsModule } from "./posts/posts.module";
import { RecipesModule } from "./recipes/recipes.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    RecipesModule,
    UsersModule,
    FeedModule,
    ExploreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
      installSubscriptionHandlers: true,
      playground: true,
      introspection: true,
      debug: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
