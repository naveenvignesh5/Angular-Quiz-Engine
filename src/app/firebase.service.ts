import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { User } from './models/models';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase) { }

  async login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
  }

  async register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then((res)=>{
      this.afDB.object('/users/'+res.uid+'/').set({
        name: user.name,
        rollno: user.rollno,
        year: user.year,
        score: 0,
      }).then(res => console.log(res),err => console.log(err));
    },err => console.log(err));
  }

  async getQuestions() {
    return this.afDB.list('/questions/').snapshotChanges();
  }

  isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser ? true : false;
  }

  async submitTest(score) {
    let uid = this.afAuth.auth.currentUser.uid;
    
    return this.afDB.object('/users/'+uid+'/').update({
      score: score
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
