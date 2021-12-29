import { Component, OnInit } from '@angular/core';
import { SharedServices } from 'src/app/shared_services/shared.services';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnInit {
  tableValues: string[][] = [];
  activeCode = '';
  currentCharacter = '';
  clickMsg = '';

  constructor(private sharedService: SharedServices) {}

  ngOnInit(): void {
    this.sharedService.currentCharacter.subscribe(
      (char) => (this.currentCharacter = char)
    );    
  }

  onKey(event: any) {
    const regex = /^[A-Za-z]/;
    let isValid = regex.test(String.fromCharCode(event.keyCode));
    this.currentCharacter = isValid ? event.key.toLowerCase() : '';
  }

  clickEvent() {    
    this.sharedService.changeCharacter(this.currentCharacter);
    const charValue = this.currentCharacter ? this.currentCharacter : 'none';
    this.clickMsg = 'Selected char is ' + charValue;
    this.buildTable();
  }

  buildTable() {
    this.tableValues = this.sharedService.readTable();
    this.sharedService.currentCode.subscribe(
      (code) => (this.activeCode = code)
    );
  }
}
