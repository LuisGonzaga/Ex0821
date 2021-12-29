import { Component, OnInit } from '@angular/core';
import { SharedServices } from 'src/app/shared_services/shared.services';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnInit {
  tableValues: string[][] = [];
  activeCode: string = '';
  currentCharacter = '';

  constructor(private sharedService: SharedServices) {}

  ngOnInit(): void {
    this.sharedService.currentCharacter.subscribe(
      (char) => (this.currentCharacter = char)
    );
    this.tableValues = this.sharedService.readTable();
    this.sharedService.currentCode.subscribe(
      (code) => (this.activeCode = code)
    );
  }
}
