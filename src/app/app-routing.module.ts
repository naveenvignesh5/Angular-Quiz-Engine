import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { RegisterComponent } from '../app/register/register.component';
import { QuizComponent } from '../app/quiz/quiz.component';

import { CanActivateRouteGuard as CanLoginGuard } from './route-guard/canlogin';
import { DeactivateGuardService as CanExitQuizGuard } from './route-guard/canFinish';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo:'/home' },
  { path:'home',component: HomeComponent },
  { path:'register',component: RegisterComponent },
  { 
    path:'quiz',
    component: QuizComponent, 
    // canActivate: [CanLoginGuard] ,
    canDeactivate: [CanExitQuizGuard]
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}
