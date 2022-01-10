import { Component, Input, OnInit } from '@angular/core';
import { SharedServices } from 'src/app/shared_services/shared.services';
import { PaymentModel } from './payment.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  @Input() activeCode = '';
  payment = '';
  value = '';

  intervalId: any;

  storedPayments = Array<PaymentModel>();

  constructor(private sharedServices: SharedServices) {}

  ngOnInit(): void {
    this.readLocals();
  }

  readLocals() {
    this.storedPayments = [];
    if (this.checkStorage()) {
      this.sharedServices
        .getItem('paymentRecords')
        .forEach((element: PaymentModel) => {
          this.storedPayments.push(element);
        });
    }
  }

  checkStorage() {
    return localStorage.getItem('paymentRecords') !== null;
  }

  clickEvent(payment: string, value: string) {
    const paymentRecord = new PaymentModel();
    paymentRecord.payment = payment;
    paymentRecord.value = value;
    paymentRecord.activeCode = this.activeCode;
    paymentRecord.date = new Date();
    this.saveToLocal(paymentRecord);
    this.readLocals();
  }

  saveToLocal(payment: PaymentModel) {
    let previousPayments = [];
    if (this.checkStorage()) {
      previousPayments = this.sharedServices.getItem('paymentRecords');
    }
    previousPayments.push(payment);
    this.sharedServices.setItem('paymentRecords', previousPayments);
  }

  deleteClick() {
    this.sharedServices.clear();
    this.storedPayments = [];
  }
}
