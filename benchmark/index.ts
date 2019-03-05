'use strict'

import benchmark = require('benchmark')
import {Router} from '../';
import findMyWay = require('find-my-way');
import express = require('express/lib/router')
import {Util} from "../lib/util";


let findMyWayRouter = findMyWay();
let expressRouter = express();

let suite = new benchmark.Suite();

const routes = [
    {method: 'GET', url: '/user'},
    {method: 'GET', url: '/user/comments'},
    {method: 'GET', url: '/user/avatar'},
    {method: 'GET', url: '/user/lookup/username/:username'},
    {method: 'GET', url: '/user/lookup/email/:address'},
    {method: 'GET', url: '/event/:id'},
    {method: 'GET', url: '/event/:id/comments'},
    {method: 'POST', url: '/event/:id/comment'},
    {method: 'GET', url: '/map/:location/events'},
    {method: 'GET', url: '/status'},
    {method: 'GET', url: '/very/deeply/nested/route/hello/there'},
    {method: 'GET', url: '/static/*'},
    {method: 'GET', url: '/test/:foo(\\d+)/'}
];


let router = new Router({useCache: false});

routes.forEach(route => {
    router.add(route.method as any, route.url, () => {
    })
});

routes.forEach(route => {
    findMyWayRouter.on(route.method as any, route.url, () => {
    })
});

routes.forEach(route => {
    if (route.method === 'GET') {
        expressRouter.route(route.url).get(() => {
        })
    } else {
        expressRouter.route(route.url).post(() => {
        })
    }
})




//***************/
suite.add('fastify: short static', function () {
    findMyWayRouter.find("GET", "/user")
});

suite.add('express: short static', function () {
    expressRouter.handle({method: 'GET', url: '/user'})
});

suite.add('router: short static', function () {
    router.find("GET", "/user")
});
//***************/

//***************/
suite.add('fastify: static with same radix', function () {
    findMyWayRouter.find("GET", "/user/comments")
});

suite.add('express:  static with same radix', function () {
    expressRouter.handle({method: 'GET', url: '/user/comments'})
});

suite.add('router:  static with same radix', function () {
    router.find("GET", "/user/comments")
});
//***************/


//***************/
suite.add('fastify: dynamic route', function () {
    findMyWayRouter.find("GET", "/user/lookup/username/john")
});

suite.add('express: dynamic route', function () {
    expressRouter.handle({method: 'GET', url: '/user/lookup/username/john'})
});

suite.add('router: dynamic route', function () {
    router.find("GET", "/user/lookup/username/john")
});
//***************/

//***************/
suite.add('fastify: mixed static dynamic', function () {
    findMyWayRouter.find("GET", "/event/abcd1234/comments")
});

suite.add('express: mixed static dynamic', function () {
    expressRouter.handle({method: 'GET', url: '/event/abcd1234/comments'}, null, () => {
    })
});

suite.add('router: mixed static dynamic', function () {
    router.find("GET", "/event/abcd1234/comments")
});
//***************/

//***************/
suite.add('fastify: long static', function () {
    findMyWayRouter.find("GET", "/very/deeply/nested/route/hello/there")
});

suite.add('express: long static', function () {
    expressRouter.handle({method: 'GET', url: '/very/deeply/nested/route/hello/there'}, null, () => {
    })
});

suite.add('router: long static', function () {
    router.find("GET", "/very/deeply/nested/route/hello/there")
});
//***************/

//***************/
suite.add('fastify: wildcard', function () {
    findMyWayRouter.find("GET", "/static/index.html")
});

suite.add('express: wildcard', function () {
    expressRouter.handle({method: 'GET', url: '/static/index.html'}, null, () => {
    })
});

suite.add('router: wildcard', function () {
    router.find("GET", "/static/index.html")
});
//***************/

suite.add('fastify: regex', function () {
    findMyWayRouter.find("GET", "/test/123/")
});

suite.add('express: regex', function () {
    expressRouter.handle({method: 'GET', url: '/test/123/'}, null, () => {
    })
});

suite.add('router: regex', function () {
    router.find("GET", "/test/123/")
});
//***************/

suite
    .on('cycle', (event) => {
        console.log(String(event.target))
        if (event.target.error)
            console.error(event.target.error)
    })
    .run()