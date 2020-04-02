import { Purchase } from './../purchase/purchase.entity';

export class GetFeedDto {
  uncompletedPurchasesForTomorrow: Purchase[];
}
