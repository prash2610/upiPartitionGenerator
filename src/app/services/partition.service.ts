import { Injectable } from '@angular/core';
import { PaymentPartition } from '../models/payment-partition.model';
@Injectable({
  providedIn: 'root'
})
export class PartitionService {

  private readonly MAX_PARTITION_AMOUNT = 1999;
  generatePartitions(totalAmount: number):PaymentPartition[]{
    const partitions: PaymentPartition[]=[];
    let remainingAmount=totalAmount,partitionId=1;
    while(remainingAmount>0){
      const partitionAmount=Math.min(remainingAmount,this.MAX_PARTITION_AMOUNT);
      partitions.push(
        {
          id: partitionId,
          amount: partitionAmount
        }
      );
      remainingAmount = remainingAmount-partitionAmount;
      partitionId++;
    }
    return partitions;
  }
  constructor() { }
}
