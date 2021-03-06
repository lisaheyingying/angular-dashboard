import { Component, NgModule, Input, Output, EventEmitter} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
})
export class BarComponent {
  @Input() barData: any[];
  @Output() openDialog = new EventEmitter();
  value: string;
  title: string;
  view: any[] = [320, 50];

  handleDialog(): void {
    this.openDialog.emit(this.title);
  }
  // options
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;

  colorScheme = {
    domain: ['deepskyblue', 'lightgray']
  };

  ngOnInit() {
    let name = this.barData[0].name;
    let filled = this.barData[0].series[0].value;
    let opened = this.barData[0].series[1].value
    this.title = this.barData[0].name;
    this.value = `${filled}/${filled + opened}`;
  }

}
