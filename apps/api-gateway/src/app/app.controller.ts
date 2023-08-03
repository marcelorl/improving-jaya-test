import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/issues/:issue_id/events')
  getIssueData(@Param('issue_id') issueId: number) {
    return this.appService.getIssueData(issueId);
  }

  @Post('/event')
  postEvent(@Body() body) {
    this.appService.postEvent(body);
    return { result: 'OK' };
  }
}
