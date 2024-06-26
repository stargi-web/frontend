import { Component, Input } from '@angular/core';
import { UserModel } from '../../model/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() userData?:UserModel;
  constructor(){}
}
