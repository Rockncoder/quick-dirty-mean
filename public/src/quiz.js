System.register(['angular2/core', './quiz-service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, quiz_service_1, router_1;
    var QuizComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (quiz_service_1_1) {
                quiz_service_1 = quiz_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            QuizComponent = (function () {
                function QuizComponent(_quizService) {
                    this._quizService = _quizService;
                    this.quizList = [];
                }
                QuizComponent.prototype.ngOnInit = function () {
                    this.getQuiz();
                };
                QuizComponent.prototype.getQuiz = function () {
                    var _this = this;
                    this._quizService.getQuizzes().then(function (quiz) {
                        _this.quizList = quiz;
                    }, function (error) { return console.log(error); });
                };
                QuizComponent = __decorate([
                    core_1.Component({
                        selector: 'quiz',
                        templateUrl: './templates/quiz.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [quiz_service_1.QuizService]
                    }), 
                    __metadata('design:paramtypes', [quiz_service_1.QuizService])
                ], QuizComponent);
                return QuizComponent;
            }());
            exports_1("QuizComponent", QuizComponent);
        }
    }
});
//# sourceMappingURL=quiz.js.map