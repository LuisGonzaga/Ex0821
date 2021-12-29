import { Component, OnInit } from '@angular/core';
import { SharedServices } from 'src/app/shared_services/shared.services';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  
  activeCode: string = '';
  constructor(private sharedService: SharedServices) { }

  ngOnInit(): void {
    this.sharedService.currentCode.subscribe(
      (code) => (this.activeCode = code)
    );
  }

}
