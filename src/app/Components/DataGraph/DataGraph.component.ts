import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataCollection } from 'src/app/Interfaces/DataCollection';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
  selector: 'app-DataGraph',
  templateUrl: './DataGraph.component.html',
  styleUrls: ['./DataGraph.component.css'],
})
export class DataGraphComponent implements OnInit {
  datalist: DataCollection[] = [];

  constructor(private service: GetDataService) {}

  ngOnInit() {
    this.GetData();


  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public GetData() {
    this.service.GetData().subscribe((data: DataCollection[]) => {
      next: this.datalist = this.service.ConvertData(data);
      success: this.AddDataToChart();
    });
  }

public AddDataToChart()
{
   console.log(this.datalist);
  for (let i = 0; i < this.datalist.length;i++)
  {
    var temp = this.datalist[i].temperature;
    var hum = this.datalist[i].humidity;
    this.lineChartData.datasets[0].data.push(temp);
    this.lineChartData.datasets[1].data.push(hum);
    var log = this.datalist[i].log
    this.lineChartData.labels?.push(log);
  }
  this.chart?.update();
}


  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets[0].data = [];

    this.lineChartData.datasets.forEach((x, i) => {
      const num = this.datalist[i].temperature;
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );

    this.chart?.update();
  }



  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
    }

    this.chart?.update();
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
}
