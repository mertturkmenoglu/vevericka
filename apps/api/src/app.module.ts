import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {BullModule} from "@nestjs/bull";
import {CacheModule} from "@nestjs/cache-manager";
import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql";
import * as RedisStore from "cache-manager-ioredis";
import {AuthModule} from "./auth/auth.module";
import {BookmarksModule} from "./bookmarks/bookmarks.module";
import {ExploreModule} from "./explore/explore.module";
import {FeedModule} from "./feed/feed.module";
import {LinkModule} from "./link/link-module";
import {PostsModule} from "./posts/posts.module";
import {SearchModule} from "./search/search.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    CacheModule.register({
      isGlobal: true,
      store: RedisStore
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
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
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
