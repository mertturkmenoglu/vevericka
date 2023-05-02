import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import * as process from "process";
import { AxiomService } from "../../axiom/axiom.service";

@Catch()
export class GlobalAxiomFilter implements GqlExceptionFilter {
  constructor(private readonly axiomService: AxiomService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const isDev = process.env.NODE_ENV === "development";
    const ctx = gqlHost.getContext();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const req = ctx.req;

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      context: {
        body: req.body,
        message: (exception as any).message,
      },
    };

    if (isDev) {
      await this.axiomService.sendEvents(body);
    }

    return exception;
  }
}
