import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ExampleModule } from './example/example.module';
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

@Module({
  imports: [
    AuthModule,
    AxiomModule,
    DbModule,
    ExampleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: false,
      stopOnTerminationSignals: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
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
    BullModule.forRoot({
      redis: process.env['REDIS_URL'] ?? '',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalAxiomFilter,
    },
  ],
})
export class AppModule {}
