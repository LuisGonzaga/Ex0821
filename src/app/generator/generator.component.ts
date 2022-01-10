import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { SharedServices } from 'src/app/shared_services/shared.services';
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnInit {
  currentCharacter = '';
  activeBtn = true;
  clickMsg = '';
  activeTable: string[][] = [];
  activeCode = '';
  @Input() timer = 0;
  timeCount: number = 0;
  clickDelay = true;

  constructor(private sharedService: SharedServices) {}

  ngOnInit(): void {
    const source = timer(0, 2000);
    const subscribe = source.subscribe((val) => {
      if (this.timeCount % 2 === 0) {
        this.activeCode = this.sharedService.generatingCode();
        this.activeTable = this.sharedService.readTable();
      }
    });
  }

  onKey(event: any) {
    const regex = /^[A-Za-z]/;
    let isValid = regex.test(String.fromCharCode(event.keyCode));
    this.currentCharacter = isValid ? event.key.toLowerCase() : '';
    this.currentCharacter ? (this.activeBtn = false) : true;
  }

  clickEvent() {
    this.clickDelay = true;
    this.sharedService.changeCharacter(this.currentCharacter);
    const charValue = this.currentCharacter;
    this.clickMsg = 'Selected char is ' + charValue;
    this.validateBtn();
  }

  validateBtn() {
    this.activeBtn = true; // disable btn 4 seconds
    setTimeout(() => {
      this.activeBtn = false;
    }, 4000);
  }
}
