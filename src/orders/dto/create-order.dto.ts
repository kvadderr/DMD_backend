export class CreateOrderDto {
  amount: number;
  paymentURL?: string;
  paymentType?: string;
  login?: string;
  user_accessToken?: string;
  promocode?: string;
  email?: string;
}

export class PaymentData {
  TerminalKey: string
  OrderId: number
  Amount: number
  Description: string
  DATA: any
  Token?: string
}