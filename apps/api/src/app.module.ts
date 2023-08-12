import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DbModule } from '@/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalAxiomFilter } from '@/common/filters/global-axiom.filter';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AxiomModule } from '@/axiom/axiom.module';
import { BookmarksModule } from '@/bookmarks/bookmarks.module';
import { EmailModule } from '@/email/email.module';
import { ExploreModule } from '@/explore/explore.module';
import { FeedModule } from '@/feed/feed.module';
import { LinkModule } from '@/link/link-module';
import { PostsModule } from '@/posts/posts.module';
import { SearchModule } from '@/search/search.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    AuthModule,
    AxiomModule,
    BookmarksModule,
    BullModule.forRoot({
      redis: process.env['REDIS_URL'] ?? '',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    EmailModule,
    ExploreModule,
    FeedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: false,
      stopOnTerminationSignals: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    LinkModule,
    MailerModule.forRoot({
      transport: `smtps://${process.env['NODEMAILER_AUTH_EMAIL']}:${process.env['NODEMAILER_AUTH_PASSWORD']}@smtp.gmail.com`,
      defaults: {
        from: `"Vevericka" <${process.env['NODEMAILER_FROM_EMAIL']}>`,
      },
      template: {
        dir: __dirname + '/email/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    PostsModule,
    SearchModule,
    ScheduleModule.forRoot(),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalAxiomFilter,
    },
  ],
})
export class AppModule {}
