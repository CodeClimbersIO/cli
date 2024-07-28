import { Controller, Get, Query } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { GetCategoryTimeOverviewDto } from "./dtos/getCategoryTimeOverview.dto";

@Controller("pulses")
export class PulseController {
  constructor(private readonly activitiesService: ActivitiesService) {
    this.activitiesService = activitiesService;
  }
  @Get("latest")
  async latestPulses(): Promise<{
    message: string;
    data: CodeClimbers.Pulse[] | undefined;
  }> {
    const pulse = await this.activitiesService.getLatestPulses();
    return { message: "success", data: pulse };
  }

  @Get("categoryTimeOverview")
  async getCategoryTimeOverview(
    @Query() times: GetCategoryTimeOverviewDto,
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    const result = await this.activitiesService.getCategoryTimeOverview(
      times.startDate,
      times.endDate,
    );
    return result;
  }

  @Get("sources")
  async getSources(): Promise<
    Promise<{
      message: string;
      data: CodeClimbers.Source[] | [];
    }>
  > {
    const sources = await this.activitiesService.getSources();
    return { message: "success", data: sources };
  }
}
