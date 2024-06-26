import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-executive-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './executive-navigation.component.html',
  styleUrl: './executive-navigation.component.css'
})
export class ExecutiveNavigationComponent implements OnInit {
  constructor(private router:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
