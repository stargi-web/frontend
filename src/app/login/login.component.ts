import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private router:Router){
    
  }
  ngSubmit(){
    this.router.navigate(['/user-view']);
    
  }
}
