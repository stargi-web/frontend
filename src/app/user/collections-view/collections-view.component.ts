import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ClientService } from '../../service/client/ClientService';
import { CollectionModel } from '../../shared/model/CollectionModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections-view',
  standalone: true,
  imports: [CardModule],
  templateUrl: './collections-view.component.html',
  styleUrl: './collections-view.component.css'
})
export class CollectionsViewComponent implements OnInit{
  collections!:CollectionModel[];
  constructor(private router: Router, private clientService:ClientService){}
  ngOnInit(): void {
    this.loadNames();
  }
  loadNames(){
    const userId=Number (sessionStorage.getItem("userId"));
    this.clientService.getCollectionsNameByUserId(userId).subscribe(
      {
        next:(response:CollectionModel[])=>{
          this.collections=response
        },
        error:error=>console.error(error)
      }
    )
  }
  redirectToClientsAssigned(collectionId: number): void {
    this.router.navigate(['/user/collections', collectionId]);
  }
}
