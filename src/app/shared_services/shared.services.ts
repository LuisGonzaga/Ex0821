import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  generating: boolean = false;
  generatedCode = '';
  preferredCharacter = '';

  tableValues: string[][] = [];

  myDate: any;

  constructor() {}

  public readTable(): string[][] {
    this.fillTableValues();
    this.generatedCode = this.generatingCode();
    return this.tableValues;
  }

  public changeCharacter(character: string): string[][] {
    this.preferredCharacter = character;
    this.fillTableValues();
    this.generatedCode = this.generatingCode();
    return this.tableValues;
  }

  public generatingCode() {
    const currentSeconds = new Date().getSeconds().toString();
    const secFirst = +currentSeconds.substring(0, 1);
    const secLast = +currentSeconds.substring(1);

    // count ocurrences
    let firstOcurrence = this.countOcurrences(
      this.tableValues[secFirst][secLast]
    );
    let secondOcurrence = this.countOcurrences(
      this.tableValues[secLast][secFirst]
    );

    // smallest integer division greater than 0
    firstOcurrence = this.smallestIntegerDivision(firstOcurrence);
    secondOcurrence = this.smallestIntegerDivision(secondOcurrence);

    return firstOcurrence.toString() + secondOcurrence.toString();
  }

  countOcurrences(value: string) {
    let ocurrences = 0;
    for (let i: number = 0; i < 10; i++) {
      ocurrences += this.tableValues[i].filter((x) => x === value).length;
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

  fillTableValues() {
    this.tableValues = [];
    let insertedValues = 0;
    let insertedChars = 0;
    for (let i: number = 0; i < 10; i++) {
      this.tableValues.push(this.getLineValues());
    }

    if (this.preferredCharacter) {
      insertedValues = this.countOcurrences(this.preferredCharacter);
      while (insertedValues + insertedChars < 20) {
        const position = this.randomNumbers();
        if (
          !this.tableValues.find(
            () =>
              this.tableValues[position[0]][position[1]] ===
              this.preferredCharacter
          )
        ) {
          insertedChars++;
          this.tableValues[position[0]][position[1]] = this.preferredCharacter;
        }
      }
    }
  }

  validateChar(element: string, index: any, array: any) {
    return element === this.preferredCharacter;
  }

  randomNumbers() {
    const min = 0;
    const max = 9;
    return [
      Math.floor(Math.random() * (max - min) + min),
      Math.floor(Math.random() * (max - min) + min),
    ];
  }

  getLineValues() {
    return Array.from({ length: 10 }, () => this.getRandomChar());
  }

  getRandomChar() {
    const randomChars = 'abcdefghijklmnopqrstuvwxyz';
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  // Local Storage
  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }
}
