import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PartitionService } from '../../services/partition.service';
import { PaymentPartition } from '../../models/payment-partition.model';
@Component({
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule],
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
  constructor(private partitionService: PartitionService){}

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    console.log(this.paymentForm.value);

    const totalAmount = this.paymentForm.controls.totalAmount.value;
    
    if (totalAmount === null) {
      return;
    }


    this.partitions =this.partitionService.generatePartitions(totalAmount);
    console.log('Partitions:', this.partitions);

    this.showQr = true;
  }
}
