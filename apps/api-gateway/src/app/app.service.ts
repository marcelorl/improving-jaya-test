import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('EVENT_MICROSERVICE') private readonly eventClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.eventClient.subscribeToResponseOf('get_issue_data');
    await this.eventClient.connect();
  }

  getIssueData(issueId: number): any {
    this.eventClient
      .send('get_issue_data', JSON.stringify({ issueId }))
      .subscribe((user: any) => {
        console.log(`WORKED -> ` + user);
      });
  }

  postEvent(createEventDto): any {
    this.eventClient.emit('post_event', JSON.stringify(createEventDto));
  }
}
