export class CreatePurchaseDto {
  userId: number;
  customerId: number;
  productId: number;
  amount: number;
  description?: string;
  completed: boolean;
}

export class UpdatePurchaseDto {
  amount: number;
  description?: string;
  completed: boolean;
}
