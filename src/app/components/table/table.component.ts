import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  nam: string;
  positio: number;
  weigh: number;
  symbo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', positio: 10, nam: 'Neon', weigh: 20.1797, symbo: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'positio', 'nam', 'weigh', 'symbo'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
