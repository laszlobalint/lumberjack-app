export class CreateProductDto {
  createdBy: number;
  name: string;
  price: number;
  amount: number;
  description?: string;
}

export class UpdateProductDto {
  name: string;
  price: number;
  amount: number;
  description?: string;
}
