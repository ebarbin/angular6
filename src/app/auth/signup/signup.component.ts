import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  content:string;

  constructor(private authService: AuthService) { }

  ngOnInit() {}



  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    try {
       var algo = eval('function apilar(pila, value) {pila.push(value); pila.push(value); return pila;}' + email);
      console.log(algo);
      } catch(e) {
      console.log(e);
    }

    // this.authService.login(email, password);
  }
}
