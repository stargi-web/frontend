import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  selected:string='';
  opciones: string[]=["Perú","Brazil","Ecuador","Argentina","Chile","Bolivia","Paraguay","Uruguay"] ;
  constructor(){
    
  }

  onSelect(opcion:string){
    this.selected=opcion;
  }
}
