import { Component } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { SharedServices } from './shared_services/shared.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ex0821';
  activePanel = false;
  tableValues: string[][] = [];
  activeCode: string = '';
  timeCount: number = 0;

  constructor(private sharedService: SharedServices) {}

  async ngOnInit() {
    this.startTimer();
    let promise = new Promise((resolve, reject) => {
      this.sharedService.readTable();
      this.activeCode = this.sharedService.generatingCode();
      setTimeout(() => resolve('done!'), 1000);
    });
    let result = await promise; // wait until the promise resolves (*)
  }

  startTimer() {
    const source = timer(0, 1000);
    const subscribe = source.subscribe((val) => {
      this.timeCount = val;
      if (this.timeCount % 2 === 0) {
        this.activeCode = this.sharedService.generatingCode();
        this.sharedService.tableValues = this.sharedService.readTable();
      }
    });
  }

  activeSwitch() {
    this.activePanel = !this.activePanel;
  }

  public buildTable() {
    this.cleanTable();
    this.tableExecution();
  }

  tableExecution() {
    this.tableValues = this.sharedService.readTable();
    this.activeCode = this.sharedService.generatedCode;
  }

  cleanTable() {
    this.tableValues = [];
    this.activeCode = '';
  }
}
