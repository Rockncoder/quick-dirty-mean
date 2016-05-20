
import {Component, OnInit} from 'angular2/core';
import {QuizService} from './quiz-service';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'quiz',
  templateUrl: './templates/quiz.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [QuizService]
})

export class QuizComponent implements OnInit {
  quizList:IQuizList[] = [];

  constructor(private _quizService:QuizService){
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.getQuizzes().then((quiz) => {
      this.quizList = quiz
    }, (error)=>console.log(error));
  }
}

