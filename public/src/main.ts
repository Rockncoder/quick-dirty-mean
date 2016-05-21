import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {MockBackend} from 'angular2/http/testing';
import {HTTP_PROVIDERS, Http, BaseRequestOptions} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy}  from 'angular2/router';
import {HomeComponent} from './home';
import {FakeWebServer} from './fake-webserver';


bootstrap(HomeComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  BaseRequestOptions,
  MockBackend,
  FakeWebServer,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide(Http, {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend, options) => {
      return new Http(backend, options);
    },
  })
]);
