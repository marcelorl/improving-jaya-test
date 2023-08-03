import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Issue, IssueDocument } from '../schemas/event.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Issue.name) private readonly issueModel: Model<IssueDocument>
  ) {}

  async logEvent(message: { payload: string }): Promise<any> {
    const { payload } = message;
    const issue = new this.issueModel(JSON.parse(payload));
    await issue.save();
  }

  getIssueData(issueId: number): Promise<Issue[]> {
    return this.issueModel.find({ issue: { number: issueId } });
  }
}
