import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  users = [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.loadResults();
  }

  loadResults() {
    this.firebase.getScoreList().then(snapshot => {
      snapshot.subscribe((data)=>{
        data.forEach(user => {
          this.users.push(user.payload.val());
          // console.log(user.payload.val());
        });
      });

      this.users.sort((a,b) => {
        if(a.score > b.score) return 1;
        else if(a.score < b.score) return -1;
        else return 0;
      });
      this.users.reverse();
      console.log(this.users);
    },err => console.error(err));
  }


}
