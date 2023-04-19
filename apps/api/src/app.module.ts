import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { ExploreModule } from "./explore/explore.module";
import { FeedModule } from "./feed/feed.module";
import { PostsModule } from "./posts/posts.module";
import { RecipesModule } from "./recipes/recipes.module";
import { UsersModule } from "./users/users.module";
import { SearchModule } from "./search/search.module";
import { BookmarksModule } from "./bookmarks/bookmarks.module";
import { LinkModule } from "./link/link-module";

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
    SearchModule,
    BookmarksModule,
    LinkModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
      playground: true,
      introspection: true,
      stopOnTerminationSignals: false,
      debug: true,
      cors: {
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
      },
    }),
  ],
})
export class AppModule {}
