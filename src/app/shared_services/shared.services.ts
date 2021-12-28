import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as randomString from 'randomstring'; // npmjs package randomstring - Library to help you create random strings

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  generatedCode = new BehaviorSubject('');
  currentCode = this.generatedCode.asObservable();

  preferredCharacter = new BehaviorSubject('');
  currentCharacter = this.preferredCharacter.asObservable();

  tableValues: string[][] = [];

  constructor() {
  }

  public readTable(): string[][] {
    this.buildTableValues();
    return this.tableValues;    
  }

  public changeCharacter(character: string): void {
    this.preferredCharacter.next(character);
  }



  private generatingCode() {
    const currentSeconds = new Date().getSeconds().toString();
    const secFirst = +currentSeconds.substring(0, 1);
    const secLast = +currentSeconds.substring(1);

    // count ocurrences
    let firstOcurrence = this.countOcurrences(this.tableValues[secFirst][secLast]);
    let secondOcurrence = this.countOcurrences(this.tableValues[secLast][secFirst]);    
    
    // smallest integer division greater than 0
    firstOcurrence = this.smallestIntegerDivision(firstOcurrence);
    secondOcurrence = this.smallestIntegerDivision(secondOcurrence);

    this.generatedCode.next(firstOcurrence.toString()+secondOcurrence.toString());
  }

  countOcurrences(value: string) {
    let ocurrences = 0;
    for (let i: number = 0; i < 10; i++) {
      ocurrences += this.tableValues[i].filter(
        (x) => x === value
      ).length;
    }
    return ocurrences;
  }

  smallestIntegerDivision(value: number) {
    let divider = 2;
    while (value > 9) {
      value = value / divider <= 9 ? Math.ceil(value / divider) : value;
      divider++;
    }
    return value;
  }

  buildTableValues() {
    for (let i: number = 0; i < 10; i++) {
      this.tableValues.push(this.getLineValues());
    }
  }

  getLineValues() {
    return Array.from({ length: 10 }, () => this.getRandomChar());
  }

  getRandomChar() {
    return randomString.generate({
      length: 1,
      charset: 'alphabetic',
      capitalization: 'lowercase',
    });
  }
}
