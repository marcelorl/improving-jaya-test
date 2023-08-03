import {
  Controller,
  Logger,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { Issue } from '../schemas/event.schema';

const logger = new Logger('Event-Controller');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('post_event')
  async logEvent(@Payload(ValidationPipe) data: { payload: string }) {
    logger.log({ topic: 'post_event', status: 'received', data });
    await this.appService.logEvent(data);
    logger.log({ topic: 'post_event', status: 'saved' });
  }

  @MessagePattern('get_issue_data')
  handleGetUser(
    @Payload('issueId', ParseIntPipe) issueId: number
  ): Promise<Issue[]> {
    return this.appService.getIssueData(issueId);
  }
}
