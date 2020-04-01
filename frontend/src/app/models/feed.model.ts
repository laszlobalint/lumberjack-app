import { PurchaseDto } from './purchases.model';

export interface FeedDto {
  nextUncompletedForTomorrow: PurchaseDto;
}
