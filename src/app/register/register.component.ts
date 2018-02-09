import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {} as User;
  temp: any; // buffer to store password copy

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.user);
    // this.router.navigateByUrl('/home');
    if(this.user.email && this.user.name && this.user.password && this.user.rollno && this.user.year && this.temp) {
      
      this.firebase.register(this.user).then((res) => {
        console.log(res);
        this.router.navigateByUrl('/home');
      },err => console.error(err));

    } else console.log("some thing is wrong")
  }
}
