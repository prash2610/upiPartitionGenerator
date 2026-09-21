import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpiService {

  constructor() { }

  generatePaymentUrl(
    upiId:string,
    payeeName: string,
    amount: number): string{
      const params=new URLSearchParams({
        pa:upiId,
        pn:payeeName,
        am:amount.toFixed(2),
        cu:'INR'
      });
      return `upi://pay?${params.toString()}`;
    }
}
