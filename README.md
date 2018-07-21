# Appolo Route
Fast and simple http routing using radix tree

## Installation:

```javascript
npm install appolo-route --save
```

## Usage:

```javascript
import {Router} from "appolo-route"

let router = new Router()
    .get("/test/:param", ()=>"working");

    output = router.find("GET" , "/test/test2");

    console.log(output.params.param) // test2
    console.log(output.handler()) // working

```

## Router
Options
- `useCache` - cache the find result by path, default : `true`
- `maxCacheSize` -  The maximum size of the cache routes, default: `1000`
- `decodeUrlParams` - true to decodeURIComponent params value, default: `false`

### Static route
```javascript

let router = new Router()
    .get("/test/test2", ()=>"working");
    .post("/test/test2", ()=>"working post");

```
### Parametric route
```javascript

let router = new Router()
    .get("/test/:userId/:userName", ()=>"working");
```
### Wildcard route
```javascript

let router = new Router()
.get("/*", ()=>"working");
```

### Regex route
same syntax as [path-to-regexp](https://github.com/pillarjs/path-to-regexp)
```javascript

let router = new Router()
.get("/test/:file(^\\d+).png", ()=>"working");
```
## Api

#### find(method: Http.Methods, path: string): { params: Params, handler: any }
find route by path return object with `params` and `handler`
if no `params` found return empty object

```javascript
import {Router} from "appolo-route"

let router = new Router()
    .get("/users/:userId", (userId)=>console.log(userId));

    result = router.find("GET" , "/users/123");

    result.handler(result.params.userId) // 123

```

#### get(path: string, handler: any): Router
register new Route handler using Http.Get Method

#### post(path: string, handler: any): Router
register new Route handler using Http.Post Method
#### put(path: string, handler: any): Router
register new Route handler using Http.Put Method
#### patch(path: string, handler: any): Router
register new Route handler using Http.Put Method
#### patch(path: string, handler: any): Router
register new Route handler using Http.Patch Method
#### delete(path: string, handler: any): Router
register new Route handler using Http.Delete Method
#### head(path: string, handler: any): Router
register new Route handler using Http.Delete Method


#### add(method:Http.Methods | Http.Methods[], path: string, handler: any): Router
register new Route handler.
multi methods supported
```javascript

let router = new Router()
    .add(["Post","Get"],"/test/:param", ()=>"working");
```

#### remove(method:Http.Methods | Http.Methods[], path: string): Router
remove Route by path.
multi methods supported
```javascript

let router = new Router()
    .add(["Post","Get"],"/test/:param", ()=>"working")
    .remove("Get","/test/:param");
```

#### reset()
reset the router remove all routes
## License
MIT