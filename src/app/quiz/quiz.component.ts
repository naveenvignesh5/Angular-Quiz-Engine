import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router'

import swal from 'sweetalert2'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  quizData = [];

  isFinished: boolean = true;

  constructor(private router: Router, private firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.getQuestions().then((res) => {
      res.subscribe((data) => {
        data.forEach(d => this.quizData.push(d.payload.val()));
      });
      // console.log(this.quizData)
    },err => console.error(err));
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

  formatCode(code) {
    let c = code.replace(/;/g,';<br>');
    return c;
  }

  // route guard to prevent users from quitting test
  canDeactivate() {
    if (!this.isFinished) {
        return false;
    } 
    return true;
  }

  submitAnswers() {
    let answer = '';
    let score = 0;
    
    this.quizData.forEach(q => {
      if(q.option === 'A') answer = q.options[0];
      else if(q.option === 'B') answer = q.options[1];
      else if(q.option === 'C') answer = q.options[2];

      if(answer === q.answer) score++;
    });

    swal({ 
      title: 'Are You Sure To Submit The Test ?', 
      text: 'Note once submitted, you cannot make any changes',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit my answers.',
      cancelButtonText: 'No' 
    }).then(()=>{
      this.firebase.submitTest(score).then(()=>{
        this.isFinished = true;
        swal('Thank You','Your test has been submitted','success')
        .then(()=>{
          this.firebase.logout().then(()=>this.router.navigateByUrl('/home'));
        });
      })
    });
  }
}
