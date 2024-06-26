import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './service/Auth/jwtInterceptor';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RouterLink,RouterLinkActive,HttpClientModule],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptorService,
    multi:true
  }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StargiFrontend';
}
