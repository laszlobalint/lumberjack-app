export interface ErrorResponseBody {
  statusCode: number;
  message: string | ValidationErrorMessage[];
  timestamp: string;
  path: string;
}

export interface ValidationErrorMessage {
  target: any;
  property: string;
  children: ValidationErrorMessage[];
  constraints: { [key: string]: string };
}
