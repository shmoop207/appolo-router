# Appolo lru cache
Fast and simple lru cache for node.js written in typescript.

The cache will remove the oldest used item when reached max capacity 
## Installation:

```javascript
npm install appolo-lru-cache --save
```

## Usage:

```javascript
import {Cache} from "appolo-lru-cache";
 
//max items in cache is 5 and all the items will expire after 1 second
 let cache  = new Cache<string,string>({maxSize:5,maxAge:1000})

cache.set("test", "value")
cache.get("test") // "value"

cache.set("test2", "value",2000) // will expire after 2 secs
cache.reset();    // empty the cache
```



## Options

- `maxSize` -  The maximum size of the cache, default 1000 
- `maxAge` optional set maximum age in ms of all cache items. if set getting expired item it will return null


## API
- `set(key, value, [maxAge])` - Set the value of the key and mark the key as most recently used.
if maxAge is passed the item will expire after maxAge ms.
- `get(key) => value` - Return the value of the key. 
If the key is not found or expired  return `null`. 
mark the key as most recently used.
- `peek(key)` - return the value of the key 
If the key is not found or expired  return `null`.
will not update recently used.
- `del(key)` - Deletes a key out of the cache.
- `reset()` - Reset the cache and delete all items.
- `has(key)` - Return true if a key is in the cache, will not update recently used
- `forEach(function(value,key,cache), [this])` - Loop over the cache items
- `keys()` - Return an array of the keys in the cache.
- `values()` - Return an array of the values in the cache.
- `size` Return the size of the cache.
- `prune()` - Delete all expired items.
- `pop()` - Remove and return the least recently used
- `maxAge` - Update cache max age. 
- `maxSize` - Update cache max size.
- `maxSize` - Update cache max size.
- `hit(key)` - Mark the key as most recently used.
- `ttl(key)` - Get the ttl time left of the key item.
- `expire(key,maxAge)` - Update the expire time of the key item.

## License
MIT