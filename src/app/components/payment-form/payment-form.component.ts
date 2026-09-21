import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PartitionService } from '../../services/partition.service';
import { PaymentPartition } from '../../models/payment-partition.model';
import { UpiService } from '../../services/upi.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-payment-form',
  imports: [
          ReactiveFormsModule,
          DecimalPipe,
          QRCodeComponent
        ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent {

  paymentForm = new FormGroup({
    totalAmount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),

    upiId: new FormControl<string>('', [
      Validators.required
    ]),

    payeeName: new FormControl<string>('', [
      Validators.required
    ])
  });

  showQr = false;
  partitions:PaymentPartition[]=[];
  constructor(private partitionService: PartitionService,
              private upiService:UpiService
  ){}

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    console.log(this.paymentForm.value);

    const totalAmount = this.paymentForm.controls.totalAmount.value;
    const upiId=this.paymentForm.controls.upiId.value;
    const payeeName=this.paymentForm.controls.payeeName.value;
    
    if (totalAmount === null||!upiId||!payeeName) {
      return;
    }


    this.partitions =this.partitionService.generatePartitions(totalAmount);
    this.partitions=this.partitions.map(partition=>({
      ...partition,
      paymentUrl:this.upiService.generatePaymentUrl(
        upiId,
        payeeName,
        partition.amount
      )
    }));
    
    console.log('Partitions:', this.partitions);

    this.showQr = true;
  }
}
