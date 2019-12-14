import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email = "";
  password = "";

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  login() {
    this.authService._login(this.email, this.password)
    .then(res => {
      this.flashMessage.show('Bienvenu vous étes authentifiié ', {
        cssClass: "alert-success", timeout: 5000
      })
      this.router.navigate(['/'])
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: "alert-danger", timeout: 10000
      })
    })
  }


}
