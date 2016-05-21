import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {FakeWebServer} from './fake-webserver';
import 'rxjs/Rx';

// we use constants to define our API's url
const baseUrl = 'api/';
const quizzesEndPoint:string = `quizzes`;
const quizEndPoint:string = `quiz/`;

// injectable allows us to provide the Http object to the service
// the callers of this service must provide HTTP_PROVIDERS
@Injectable()
export class QuizService implements IQuizService {

  // the Http object is injected to the constructor
  // and assigned to the local variable http
  constructor(private http:Http, @Inject(FakeWebServer) fake:FakeWebServer) {
  }

  // Angular 2 is built for Observable, that's why it requires RxJS
  // but we aren't quite ready for them yet, so we convert
  // the observable to a promise, which we know and love

  // get all of the quizzes
  getQuizzes():Promise<IQuizList[]> {
    // construct our URL and make the ajax call, an observable is returned
    let url = `${baseUrl}${quizzesEndPoint}`;
    console.log("Loading: " + url);
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // get a specific quiz
  getQuiz(id:string):Promise<IQuizList> {
    let url = `${baseUrl}${quizEndPoint}${id}`;
    console.log("Loading: " + url);

    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json() || {};
  }

  private handleError(error:any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    throw new Error(errMsg);
  }
}
