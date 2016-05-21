System.register(['angular2/platform/browser', 'angular2/core', 'angular2/http/testing', 'angular2/http', 'angular2/router', './home', './fake-webserver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, testing_1, http_1, router_1, home_1, fake_webserver_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (fake_webserver_1_1) {
                fake_webserver_1 = fake_webserver_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(home_1.HomeComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                http_1.BaseRequestOptions,
                testing_1.MockBackend,
                fake_webserver_1.FakeWebServer,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                core_1.provide(http_1.Http, {
                    deps: [testing_1.MockBackend, http_1.BaseRequestOptions],
                    useFactory: function (backend, options) {
                        return new http_1.Http(backend, options);
                    },
                })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map