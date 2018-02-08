import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizData: any;

  constructor(private service: AppService) { 

  }

  ngOnInit() {
    this.service.getData().subscribe(data => this.quizData = data,err => console.log(err));
  }


}
