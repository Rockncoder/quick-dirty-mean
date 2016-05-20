import {Component, OnInit} from 'angular2/core';
import {Router, Location, RouteParams, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {QuizService} from './quiz-service';
import {Seek} from './Seek';

// an internal class
class Position {
  index:number;
  total:number;

  constructor(maxPosition?:number) {
    this.total = maxPosition || 0;
    this.index = 0;
  }

  setMax(maxPosition:number) {
    this.total = maxPosition;
  }

  seek(direction:Seek) {
    switch (direction) {
      case Seek.Forward:
        if (this.index < this.total) {
          this.index += 1;
        }
        break;
      case Seek.Backward:
        if (this.index) {
          this.index -= 1;
        }
        break;
      case Seek.Beginning:
        this.index = 0;
    }
  }

  getPosition() {
    return this.index;
  }

  getTotal() {
    return this.total;
  }
}

// The component and the class must be together
@Component({
  selector: 'player',
  templateUrl: './templates/player.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [QuizService, ROUTER_PROVIDERS]
})

export class PlayerComponent implements OnInit {
  questions:IQuizList;
  answers:Array<boolean[]> = [];
  position:Position;
  player:any;
  showAnswers:boolean = false;
  index = 0;
  total = 0;
  right = 0;
  percent = 0;
  responses = [];
  title = "";
  tagLine = "";

  // start with an empty question
  current:IQuestion = {
    question: "",
    choices: []
  };

  constructor(private _quizService:QuizService, private _location:Location, private _routeParams:RouteParams, private _router:Router) {
    this.position = new Position();
  }

  ngOnInit() {
    this.getQuiz();
  }

  // calls the quiz service to get the current quiz (questions/answers)
  getQuiz() {
    let id = this._routeParams.get('id');

    // Remember: a promise is being returned from the service now
    this._quizService.getQuiz(id).then(
      // if the promise was resolved (aka successful)
      (data) => {
        console.info(`Received data from service: ${JSON.stringify(data)}`);
        this.questions = data;
        this.title = data.title;
        this.tagLine = data.tagLine;
        this.current = data.suite[0];
        this.total = data.suite.length;

        this.position.setMax(data.suite.length);
        this.position.seek(Seek.Beginning);
        this.seekToQuestion(Seek.Beginning);
      },
      // if the promise was rejected (aka failed)
      (error)=>console.log(error)
    );
  }

  // retrieve all of the player's responses to a quiz question (remember there can be more answer per question)
  getPlayerResponses(responses:Array<boolean>, question:IChoice[]):boolean[] {
    let ndx:number;
    let newResponses = question.map(() => false);

    for (ndx = 0; ndx < responses.length; ndx += 1) {
      if (responses[ndx]) {
        newResponses[ndx] = true;
      }
    }
    return newResponses;
  }

  seekToQuestion(direction:Seek) {
    // get the current responses only if
    if (direction !== Seek.Beginning) {
      this.answers[this.position.getPosition()] = this.getPlayerResponses(this.responses, this.current.choices);
    }

    this.position.seek(direction);
    let pos = this.position.getPosition();
    // get the current questions from the quiz
    this.current = this.questions.suite[pos];
    // restore previous answer if one exists
    this.responses = (this.answers[pos]) ? this.answers[pos] : [];
    this.index = pos;
  }

  // does the actual scoring
  tabulate(questions, answers):number {
    return questions.reduce((previousScore, currentQuestion, index)=> {
      let question = currentQuestion.choices.map((choice:IChoice) => !!choice.isAnswer);
      let answer = answers[index];

      // check to see if every player response matches each answer
      let points = (answer && question.every((val, index) => val === answer[index]) ? 1 : 0);
      return previousScore + points;
    }, 0);
  }

  // the 'prev' button was clicked, move to previous question
  previous = () => this.seekToQuestion(Seek.Backward);

  // The 'next' button was clicked, move to the next question
  next = () => this.seekToQuestion(Seek.Forward);

  // The 'score' button was clicked, let's tabulate the answers
  score = () => {
    this.seekToQuestion(Seek.Score);
    this.right = this.tabulate(this.questions.suite, this.answers);
    this.showAnswers = true;
    this.seekToQuestion(Seek.Beginning);
  };

  // reset the path back to the beginning
  exit = () => {
    this._router.navigate(['/about']);
  };
}

/*

 This code was originally part of the tabulate method, but it was replaced with a more concise
 was there an answer for the current question?
 if (answer) {
 default to the player answering correctly

 correct = true;
 for (inner = 0; inner < answer.length; inner += 1) {
 if (question[inner] != answer[inner]) {
 correct = false;
 break;
 }
 }

 we've replaced the code above with this more functional version
 correct = answer && question.every((val, index) => val === answer[index]);
 }
 */

/*


 let outer:number;
 let right = 0;
 // loop through all of the responses & compare them to the answers
 for (outer = 0; outer < this.total; outer += 1) {
 let question = this.questions.suite[outer].choices.map((choice:IChoice) => !!choice.isAnswer);
 let answer = this.answers[outer];

 // this is a very functional way to determine if the answer is correct (see another version below)
 let correct = answer && question.every((val, index) => val === answer[index]);
 right += (correct ? 1 : 0);
 console.info(`question ${outer} = ${(correct ? 'right' : 'wrong')}`);
 }
 debugger;
 return right;

 */
