export interface ErrorResponseBody {
  statusCode: number;
  message: string | ValidationError[];
  timestamp: string;
  path: string;
}

export interface ValidationError {
  target: Object;
  property: string;
  value: any;
  constraints?: ValidationConstraint;
  children?: ValidationError[];
}

export interface ValidationConstraint {
  [type: string]: string;
}
