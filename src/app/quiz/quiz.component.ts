import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizData = [];

  isFinished: boolean = false;

  constructor(private router: Router, private firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.getQuestions().then((res) => {
      res.subscribe((data) => {
        data.forEach(d => this.quizData.push(d.payload.val()))
      });
    },err => console.error(err));
  }

  protected gotoHome() {
    this.router.navigateByUrl('/home');
  }

  // route guard to prevent users from quitting test
  canDeactivate() {
    
    if (!this.isFinished) {
        console.log('no, you wont navigate anywhere');
        return false;
    }
    
    return true;
  }
}
