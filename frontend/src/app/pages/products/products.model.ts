export class Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  date: Date;
  userId: number;
}

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
