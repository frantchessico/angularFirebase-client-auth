import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  _register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  
  _login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isAuthenticated() {
    return this.afAuth.user;
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
