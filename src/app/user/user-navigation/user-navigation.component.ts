import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-user-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-navigation.component.html',
  styleUrl: './user-navigation.component.css'
})
export class UserNavigationComponent {
  constructor(private router:Router){}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
