import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart'
import { DropdownModule } from 'primeng/dropdown';
import { InfoModel } from '../../../user/saved/model/InfoModel';
@Component({
  selector: 'app-info-chart',
  standalone: true,
  imports: [ChartModule,CommonModule,FormsModule,DropdownModule,ButtonModule],
  templateUrl: './info-chart.component.html',
  styleUrl: './info-chart.component.css'
})
export class InfoChartComponent {
  @Input() datos!: InfoModel[];
  chartData: any;
  chartOptions: any;
  selectedMonth: any;
  months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 }
  ];
  ngOnInit(): void {
    this.initChartOptions();
  }

  initChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Stages'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Count'
          }
        }
      }
    };
  }

  generateChart() {
    if (this.selectedMonth === undefined) {
      alert('Please select a month');
      return;
    }

    const filteredInfos = this.datos.filter(info => {
      const infoDate = new Date(info.updatedAt);
      return infoDate.getMonth() === this.selectedMonth.value;
    });

    const stageCounts = {
      IDENTIFICACION: 0,
      CALIFICACION: 0,
      PROPUESTA: 0,
      NEGOCIACION: 0,
      CIERRE: 0
    };

    filteredInfos.forEach(info => {
      if (stageCounts[info.stage as keyof typeof stageCounts] !== undefined) {
        stageCounts[info.stage as keyof typeof stageCounts]++;
      }
    });

    this.chartData = {
      labels: Object.keys(stageCounts),
      datasets: [
        {
          label: 'Infos by Stage',
          data: Object.values(stageCounts),
          backgroundColor: [
            '#42A5F5',
            '#66BB6A',
            '#FFA726',
            '#FF7043',
            '#AB47BC'
          ]
        }
      ]
    };
  }
}
