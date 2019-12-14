import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  currentUser = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated()
        .subscribe(user => this.currentUser = user)
  }

  logout() {
    this.authService.signOut()
                    .then(() => {
                      this.router.navigate(['/login'])
                    })
  }

}
