import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-expense-graph',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './expense-graph.component.html',
  styleUrl: './expense-graph.component.scss',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    ::ng-deep .ngx-charts {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
    }
  `],
})
export class ExpenseGraphComponent {
  @Input() graphData: any = [];
  view: [number, number] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onResize(event: any) {
    const screenWidth = event.target.innerWidth;
    const isSmallScreen = screenWidth < 768; // Adjust the breakpoint as needed
    const perfectSize = isSmallScreen ? screenWidth : 700;
    this.view = [perfectSize, 400];
  }
}
