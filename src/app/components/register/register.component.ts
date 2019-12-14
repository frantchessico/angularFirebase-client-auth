import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  email = "";
  password = "";

  constructor(private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService._register(this.email, this.password)
                    .then(res => {
                      this.flashMessage.show('Votre compte a été bien crée', {
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
