import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { Time } from '../models/models';

import swal from 'sweetalert2'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  quizData = [];
  
  isFinished: boolean = true;

  time = {} as Time;

  duration = environment.testDuration;

  score:number = 0;
  
  constructor(private router: Router, private firebase: FirebaseService) {}

  ngOnInit() {
    
    this.setupTimer();

    this.firebase.getQuestions().then((res) => {
      res.subscribe((data) => {
        data.forEach(d => this.quizData.push(d.payload.val()));
      });
      // console.log(this.quizData)
    },err => console.error(err));
  }

  setupTimer() {
    let refreshId = setInterval(()=>{
      this.time.min = Math.floor(this.duration / 60);
      this.time.sec = Math.floor(this.duration % 60);

      this.time.min = this.time.min < 10 ? '0' + this.time.min : this.time.min;
      this.time.sec = this.time.sec < 10 ? '0' + this.time.sec : this.time.sec;

      if(--this.duration < 0) {
        clearInterval(refreshId);
        this.evaluateTest();
        swal({
          title: 'Time is up',
          text: 'Thank you for attending the test',
          type: 'info',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCancelButton: false,
          confirmButtonText: 'Submit Test'
        }).then((result)=>{
          if(result.value) {
            this.firebase.submitTest(this.score).then(()=>{
              this.isFinished = true;
              swal('Thank You','Your test has been submitted','success')
              .then((result)=>{
                if(result.value) this.firebase.logout().then(()=>this.router.navigateByUrl('/home'));
              });
            });
          }
        });

        return;
      }
    },1000);
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

  formatCode(code) {
    let c = code.replace(/;/g,';<br>')
                .replace(/int/g,'<br>int main')
                .replace(/{/g,'<br>{');
    return c;
  }

  // route guard to prevent users from quitting test
  canDeactivate() {
    if (!this.isFinished) {
        return false;
    } 
    return true;
  }

  evaluateTest() {
    let answer = '';
    
    this.quizData.forEach(q => {
      if(q.selected === 'A') answer = q.option1;
      else if(q.selected === 'B') answer = q.option2;
      else if(q.selected === 'C') answer = q.option3;
      else if(q.selected === 'D') answer = q.option4;

      if(answer === q.answer) this.score++;
    });
  }
  submitAnswers() {
    this.evaluateTest();

    swal({ 
      title: 'Are You Sure To Submit The Test ?', 
      text: 'Note once submitted, you cannot make any changes',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit my answers.',
      cancelButtonText: 'No' 
    }).then(()=>{
      // console.log(score);
      this.firebase.submitTest(this.score).then(()=>{
        this.isFinished = true;
        swal('Thank You','Your test has been submitted','success')
        .then((result)=>{
          if(result.value) this.firebase.logout().then(()=>this.router.navigateByUrl('/home'));
        });
      });
    });
  }

  quit() {
    swal({
      title: 'Are you sure ?',
      text: 'Once you quit all your changes will be disgraded.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Quit.',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value) this.firebase.logout().then(() => this.router.navigateByUrl('/home'));
    });
  }
}
