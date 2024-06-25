export class CreateOrderDto {
  amount: number;
  userID: string;
  paymentURL?: string;
  paymentType?: number;
  status?:string;
  rebillId?: number;
}

export class PaymentData {
  TerminalKey: string
  OrderId: number
  Amount: number
  Description: string
  DATA: any
  Token?: string
  Recurrent: string
}