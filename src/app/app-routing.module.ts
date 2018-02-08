import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { RegisterComponent } from '../app/register/register.component';
import { QuizComponent } from '../app/quiz/quiz.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo:'/home' },
  { path:'home',component: HomeComponent },
  { path:'register',component: RegisterComponent },
  { path:'quiz',component: QuizComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
