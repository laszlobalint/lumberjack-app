import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetFeedDto } from './feed.dto';
import { FeedService } from './feed.service';

@ApiTags('feed')
@Controller('api/feed')
@UseGuards(JwtAuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returned feed.' })
  async getFeed(): Promise<GetFeedDto> {
    return await this.feedService.getFeed();
  }
}
