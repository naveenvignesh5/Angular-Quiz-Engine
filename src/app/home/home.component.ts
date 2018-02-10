import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/models';

import { FirebaseService } from '../firebase.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = {} as User;
  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit() {
    if(this.firebase.isAuthenticated()) this.router.navigateByUrl('/quiz');
  }

  loginUser() {
    if(this.user.email && this.user.password) {
      this.firebase.login(this.user)
      .then(()=>this.router.navigateByUrl('/quiz'))
      .catch((err)=>{
        if(err.code == 'auth/wrong-password' || err.code == 'auth/user-not-found') {
          swal('Wrong Credentials','Enter the right credentials','error');
        } 
      });
    }
  }
}
