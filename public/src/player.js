System.register(['angular2/core', 'angular2/router', './quiz-service', './Seek'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, quiz_service_1, Seek_1;
    var Position, PlayerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (quiz_service_1_1) {
                quiz_service_1 = quiz_service_1_1;
            },
            function (Seek_1_1) {
                Seek_1 = Seek_1_1;
            }],
        execute: function() {
            // an internal class
            Position = (function () {
                function Position(maxPosition) {
                    this.total = maxPosition || 0;
                    this.index = 0;
                }
                Position.prototype.setMax = function (maxPosition) {
                    this.total = maxPosition;
                };
                Position.prototype.seek = function (direction) {
                    switch (direction) {
                        case Seek_1.Seek.Forward:
                            if (this.index < this.total) {
                                this.index += 1;
                            }
                            break;
                        case Seek_1.Seek.Backward:
                            if (this.index) {
                                this.index -= 1;
                            }
                            break;
                        case Seek_1.Seek.Beginning:
                            this.index = 0;
                    }
                };
                Position.prototype.getPosition = function () {
                    return this.index;
                };
                Position.prototype.getTotal = function () {
                    return this.total;
                };
                return Position;
            }());
            // The component and the class must be together
            PlayerComponent = (function () {
                function PlayerComponent(_quizService, _location, _routeParams, _router) {
                    var _this = this;
                    this._quizService = _quizService;
                    this._location = _location;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.answers = [];
                    this.showAnswers = false;
                    this.index = 0;
                    this.total = 0;
                    this.right = 0;
                    this.percent = 0;
                    this.responses = [];
                    this.title = "";
                    this.tagLine = "";
                    // start with an empty question
                    this.current = {
                        question: "",
                        choices: []
                    };
                    // the 'prev' button was clicked, move to previous question
                    this.previous = function () { return _this.seekToQuestion(Seek_1.Seek.Backward); };
                    // The 'next' button was clicked, move to the next question
                    this.next = function () { return _this.seekToQuestion(Seek_1.Seek.Forward); };
                    // The 'score' button was clicked, let's tabulate the answers
                    this.score = function () {
                        _this.seekToQuestion(Seek_1.Seek.Score);
                        _this.right = _this.tabulate(_this.questions.suite, _this.answers);
                        _this.showAnswers = true;
                        _this.seekToQuestion(Seek_1.Seek.Beginning);
                    };
                    this.position = new Position();
                }
                PlayerComponent.prototype.ngOnInit = function () {
                    this.getQuiz();
                };
                // calls the quiz service to get the current quiz (questions/answers)
                PlayerComponent.prototype.getQuiz = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    // Remember: a promise is being returned from the service now
                    this._quizService.getQuiz(id).then(
                    // if the promise was resolved (aka successful)
                    function (data) {
                        console.info("Received data from service: " + JSON.stringify(data));
                        _this.questions = data;
                        _this.title = data.title;
                        _this.tagLine = data.tagLine;
                        _this.current = data.suite[0];
                        _this.total = data.suite.length;
                        _this.position.setMax(data.suite.length);
                        _this.position.seek(Seek_1.Seek.Beginning);
                        _this.seekToQuestion(Seek_1.Seek.Beginning);
                    }, 
                    // if the promise was rejected (aka failed)
                    function (error) { return console.log(error); });
                };
                // retrieve all of the player's responses to a quiz question (remember there can be more answer per question)
                PlayerComponent.prototype.getPlayerResponses = function (responses, question) {
                    var ndx;
                    var newResponses = question.map(function () { return false; });
                    for (ndx = 0; ndx < responses.length; ndx += 1) {
                        if (responses[ndx]) {
                            newResponses[ndx] = true;
                        }
                    }
                    return newResponses;
                };
                PlayerComponent.prototype.seekToQuestion = function (direction) {
                    // get the current responses only if
                    if (direction !== Seek_1.Seek.Beginning) {
                        this.answers[this.position.getPosition()] = this.getPlayerResponses(this.responses, this.current.choices);
                    }
                    this.position.seek(direction);
                    var pos = this.position.getPosition();
                    // get the current questions from the quiz
                    this.current = this.questions.suite[pos];
                    // restore previous answer if one exists
                    this.responses = (this.answers[pos]) ? this.answers[pos] : [];
                    this.index = pos;
                };
                // does the actual scoring
                PlayerComponent.prototype.tabulate = function (questions, answers) {
                    return questions.reduce(function (previousScore, currentQuestion, index) {
                        var question = currentQuestion.choices.map(function (choice) { return !!choice.isAnswer; });
                        var answer = answers[index];
                        // check to see if every player response matches each answer
                        var points = (answer && question.every(function (val, index) { return val === answer[index]; }) ? 1 : 0);
                        return previousScore + points;
                    }, 0);
                };
                PlayerComponent = __decorate([
                    core_1.Component({
                        selector: 'player',
                        templateUrl: './templates/player.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [quiz_service_1.QuizService, router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [quiz_service_1.QuizService, (typeof (_a = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _a) || Object, (typeof (_b = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object])
                ], PlayerComponent);
                return PlayerComponent;
                var _a, _b, _c;
            }());
            exports_1("PlayerComponent", PlayerComponent);
        }
    }
});
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
//# sourceMappingURL=player.js.map