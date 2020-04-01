import { PurchaseDto } from './purchases.model';

export interface FeedDto {
  uncompletedPurchasesForTomorrow: PurchaseDto[];
}
