"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("Router", () => {
    it("Should find static route with empty route", () => {
        let router = new index_1.Router();
        router.get("/test", { working1: true });
        let output = router.find("GET", "/");
        should.not.exist(output);
        router = new index_1.Router();
        router.get("/:test", { working1: true });
        output = router.find("GET", "/");
        should.not.exist(output);
        router = new index_1.Router();
        router.get("/(.*)22", { working1: true });
        output = router.find("GET", "/");
        should.not.exist(output);
    });
    it("Should find static route ", () => {
        let router = new index_1.Router();
        router.get("/test/", { working1: true });
        router.get("/test/test2/test3/", { working2: true });
        router.get("/test/test2/", { working3: true });
        router.get("/test/test2/test3/test4/", { working4: true });
        //let output = router.find("GET" as Methods, "/test/");
        //output.handler.working1.should.be.ok;
        let output = router.find("GET", "/test/test2/test3/");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/test/test2/");
        output.handler.working3.should.be.ok;
        output = router.find("GET", "/test/test2/test3/test4/");
        output.handler.working4.should.be.ok;
        output = router.find("GET", "/test/test2/test3/test4/test5/");
        should.not.exist(output);
        output = router.find("GET", "/test/test2/test3/test5/");
        should.not.exist(output);
    });
    it("Should find param route ", () => {
        let router = new index_1.Router({ maxCacheSize: 1 });
        router.get("/:test/", { working1: true });
        router.get("/test/test2/:test3/", { working2: true });
        router.get("/test/:test2/", { working3: true });
        router.get("/test/:test2/:test3/test4/", { working4: true });
        router.find("GET", "/test/");
        router.find("GET", "/test/");
        let output = router.find("GET", "/test/");
        output.handler.working1.should.be.ok;
        output.params.test.should.be.eq("test");
        output = router.find("GET", "/test/test2/test3/");
        output.handler.working2.should.be.ok;
        output.params.test3.should.be.eq("test3");
        output = router.find("GET", "/test/test2/");
        output.handler.working3.should.be.ok;
        output.params.test2.should.be.eq("test2");
        output = router.find("GET", "/test/test2/test3/test4/");
        output.handler.working4.should.be.ok;
        output.params.test2.should.be.eq("test2");
        output.params.test3.should.be.eq("test3");
    });
    it("Should remove  route ", () => {
        let router = new index_1.Router({ useCache: false });
        router.get("/:test/", { working1: true });
        router.get("/test/test2/:test3/", { working2: true });
        router.get("/test/:test2/", { working3: true });
        router.get("/test/:test2/:test3/test4/", { working4: true });
        let output = router.find("GET", "/test/");
        output.handler.working1.should.be.ok;
        output.params.test.should.be.eq("test");
        output = router.find("GET", "/test/test2/test3/");
        output.handler.working2.should.be.ok;
        output.params.test3.should.be.eq("test3");
        output = router.find("GET", "/test/test2/");
        output.handler.working3.should.be.ok;
        output.params.test2.should.be.eq("test2");
        output = router.find("GET", "/test/test2/test3/test4/");
        output.handler.working4.should.be.ok;
        output.params.test2.should.be.eq("test2");
        output.params.test3.should.be.eq("test3");
        router.remove("GET", "/:test/");
        router.remove("GET", "/test/:test2/");
        should.not.exist(router.find("GET", "/test/"));
        output = router.find("GET", "/test/test2/test3/");
        output.handler.working2.should.be.ok;
        output.params.test3.should.be.eq("test3");
        should.not.exist(router.find("GET", "/test/test2/"));
        output = router.find("GET", "/test/test2/test3/test4/");
        output.handler.working4.should.be.ok;
        output.params.test2.should.be.eq("test2");
        output.params.test3.should.be.eq("test3");
    });
    it("Should find param route decoded", () => {
        let router = new index_1.Router({ decodeUrlParams: true });
        router.get("/test/:test2/", { working3: true });
        router.get("/test/aaa/:test2-:test3/", { working4: true });
        let output = router.find("GET", `/test/${encodeURIComponent("http://www.cnn.com")}/`);
        output.handler.working3.should.be.ok;
        output.params.test2.should.be.eq("http://www.cnn.com");
        output = router.find("GET", `/test/aaa/${encodeURIComponent("http://www.cnn.com")}-bbb/`);
        output.handler.working4.should.be.ok;
        output.params.test2.should.be.eq("http://www.cnn.com");
        output.params.test3.should.be.eq("bbb");
    });
    it("Should find regex route ", () => {
        let router = new index_1.Router();
        router.get("/test/:foo(\\d+)/", { working1: true });
        let output = router.find("GET", "/test/123/");
        output.handler.working1.should.be.ok;
        output.params.foo.should.be.eq("123");
        output = router.find("GET", "/test/123test/");
        should.not.exist(output);
    });
    it("Should find regex route with param ", () => {
        let router = new index_1.Router();
        router.get("/test/:foo/(.*)/:bar", { working2: true });
        let output = router.find("GET", "/test/123test/bbb/ccc");
        output.handler.working2.should.be.ok;
        output.params.foo.should.be.eq("123test");
        output.params.bar.should.be.eq("ccc");
    });
    it("Should find regex route with param and wildcard", () => {
        let router = new index_1.Router();
        router.get("/test/:foo*", { working2: true });
        router.get("/test/:foo/(.*)/:test2", { working3: true });
        let output = router.find("GET", "/test/123test/nnn");
        output.handler.working2.should.be.ok;
        output.params.foo.should.be.eq("123test/nnn");
        output = router.find("GET", "/test/123test/bbb/cccc");
        output.handler.working3.should.be.ok;
        output.params.foo.should.be.eq("123test");
        output.params.test2.should.be.eq("cccc");
    });
    it("Should find with regex route with wildcard ", () => {
        let router = new index_1.Router();
        router.get("/test/*", { working2: true });
        router.get("/test/:foo/test2", { working3: true });
        router.get("/test/*/*/*/:test5", { working4: true });
        let output = router.find("GET", "/test/");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/test");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/tes/");
        should.not.exist(output);
        output = router.find("GET", "/test/123test/nnn");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/test/123test/test2/");
        output.handler.working3.should.be.ok;
        output.params.foo.should.be.eq("123test");
        output = router.find("GET", "/test/123test/test3/");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/test/123test/test3/test4");
        output.handler.working2.should.be.ok;
        output = router.find("GET", "/test/aaa/bbb/ccc/test5");
        output.handler.working4.should.be.ok;
        output.params.test5.should.be.eq("test5");
    });
    it("Should find route with parametric route contains dash ", () => {
        let router = new index_1.Router();
        router.get('/a/:param/b', { name: 1 });
        router.find("GET", "/a/foo-bar/b").params.param.should.be.eq("foo-bar");
    });
    it("Should not find route with an extension regex", () => {
        let router = new index_1.Router();
        router.get('/test/:file(^\\d+).png', { name: 1 });
        router.get('/test/at/:hour(\\d{2})h:minute(\\d{2})m', { name: 2 });
        router.find("GET", "/test/12.png").params.file.should.be.eq("12");
        let output = router.find("GET", "/test/at/13h15m");
        output.params.hour.should.be.eq("13");
        output.params.minute.should.be.eq("15");
        should.not.exist(router.find("GET", "/test/aa.png"));
    });
    it("Should find route with mixed nested route with double matching regex", () => {
        let router = new index_1.Router();
        router.get('/test/:id(\\d+)/hello/:world(\\d+)', { name: 1 });
        router.find("GET", "/test/12/hello/14").params.id.should.be.eq("12");
        should.not.exist(router.find("GET", "/test/12/hello/mmm"));
    });
    it("Should find all routes", () => {
        let router = new index_1.Router();
        router.get('*', { name: 1 });
        router.get('/', { name: 2 });
        router.get('/aa/bb/:test', { name: 3 });
        router.find("GET", "/aa/bb/vvv").handler.name.should.be.eq(3);
        router.find("GET", "/").handler.name.should.be.eq(2);
        router.find("GET", "/vvv").handler.name.should.be.eq(1);
    });
    it("Should find all routes by order", () => {
        let router = new index_1.Router();
        router.get('*', { name: 1 });
        router.get('/static/*', { name: 2 });
        router.get('/simple', { name: 3 });
        router.get('/simple/:bar', { name: 4 });
        router.get('/hello', { name: 5 });
        router.find("GET", "/static/").handler.name.should.be.eq(2);
        router.find("GET", "/static/hello").handler.name.should.be.eq(2);
        router.find("GET", "/static").handler.name.should.be.eq(2);
        router.find("GET", "/hello").handler.name.should.be.eq(5);
        router.find("GET", "/hello2").handler.name.should.be.eq(1);
        router.find("GET", "/simple/aaa").handler.name.should.be.eq(4);
        router.find("GET", "/simple").handler.name.should.be.eq(3);
        router.find("GET", "/simple/bbb/ccc").handler.name.should.be.eq(1);
    });
    it("Should run benchmarks tests", () => {
        const routes = [
            { method: 'GET', url: '/user' },
            { method: 'GET', url: '/user/comments' },
            { method: 'GET', url: '/user/avatar' },
            { method: 'GET', url: '/user/lookup/username/:username' },
            { method: 'GET', url: '/user/lookup/email/:address' },
            { method: 'GET', url: '/event/:id' },
            { method: 'GET', url: '/event/:id/comments' },
            { method: 'POST', url: '/event/:id/comment' },
            { method: 'GET', url: '/map/:location/events' },
            { method: 'GET', url: '/status' },
            { method: 'GET', url: '/very/deeply/nested/route/hello/there' },
            { method: 'GET', url: '/static/*' },
            { method: 'GET', url: '/user/*' }
        ];
        let router = new index_1.Router();
        routes.forEach((route, index) => {
            router.add(route.method, route.url, { name: index });
        });
        router.find("GET", "/user").handler.name.should.be.eq(0);
        router.find("GET", "/user/lookup/username/john").handler.name.should.be.eq(3);
        router.find("GET", "/event/abcd1234/comments").handler.name.should.be.eq(6);
        router.find("GET", "/very/deeply/nested/route/hello/there").handler.name.should.be.eq(10);
        router.find("GET", "/static/index.html").handler.name.should.be.eq(11);
    });
    it("Should find route with  empty parameter", () => {
        let router = new index_1.Router();
        router.get('/a/:param', { name: 1 });
        let result = router.find("GET", '/a//');
        result.params.param.should.be.eq("");
        should.not.exist(router.find("GET", "/a/"));
    });
    it("Should find route with Parametric and static with shared prefix and wildcard", () => {
        let router = new index_1.Router();
        router.get('/abc', { name: 1 });
        router.get('/:param', { name: 2 });
        router.get('/ab', { name: 3 });
        router.get('/*', { name: 4 });
        let result = router.find("GET", '/test');
        result.params.param.should.be.eq("test");
        result = router.find("GET", '/abc/bbb');
        result.handler.name.should.be.eq(4);
        result = router.find("GET", '/abc/');
        result.handler.name.should.be.eq(1);
    });
});
//# sourceMappingURL=unit.js.map