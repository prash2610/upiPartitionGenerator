import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PaymentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'upiPartitionGenerator';
}
