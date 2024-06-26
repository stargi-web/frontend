import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InfoModel } from '../../../user/saved/model/InfoModel';
import { InfoService } from '../../../user/main/infoService';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InfoChartComponent } from '../info-chart/info-chart.component';
@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [InfoChartComponent,TableModule,CommonModule,ButtonModule,DropdownModule,CalendarModule,FormsModule],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent implements OnInit {
  datos!:InfoModel[];
  loading:boolean=true;
  stages=[
    { name: 'IDENTIFICACION' },
    { name: 'CALIFICACION' },
    { name: 'PROPUESTA' },
    { name: 'NEGOCIACION' },
    { name: 'CIERRE' }
  ]
  selectedStage: any;
  dateRange: Date[] = [];
  percentage: number = 0;
  ngOnInit(): void {
    this.getInfos();
  }
  constructor(private infoService:InfoService){}
  
  getInfos(){
    this.infoService.getAllInfos().subscribe({
      next:(response)=>{
        this.datos=response;
        this.loading=false;
      },
      error:error=>console.error(error)
    })
  }
  showRecord(){}
  calculatePercentage() {
    if (!this.dateRange || this.dateRange.length < 2) {
      alert('Please select a valid date range');
      return;
    }

    const [startDate, endDate] = this.dateRange;
    const totalInfosInRange = this.datos.filter(info =>
      new Date(info.updatedAt) >= startDate && new Date(info.updatedAt) <= endDate
    );

    const filteredInfos = totalInfosInRange.filter(info => info.stage === this.selectedStage.name);

    if (totalInfosInRange.length > 0) {
      this.percentage = (filteredInfos.length / totalInfosInRange.length) * 100;
    } else {
      this.percentage = 0;
    }
  }
}
