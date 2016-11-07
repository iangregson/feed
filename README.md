# Scruffy
[![Build Status](https://travis-ci.org/iangregson/scruffy.svg?branch=master)](https://travis-ci.org/iangregson/scruffy)
[![Coverage Status](https://coveralls.io/repos/github/iangregson/scruffy/badge.svg?branch=master)](https://coveralls.io/github/iangregson/scruffy?branch=master)

Turns an RSS feed into a JS object ticker using Observables.
Use it to get the most recent articles from a feed at a given interval.


## Install from npm:

`npm install scruffy --save`

## Example:

```javascript
import { Feed } from 'scruffy'

const feed = new Feed({ url: 'http://example.com/posts.atom' })

feed.on('ready', () => feed.top().subscribe(item => console.log(item.title)))

feed.init()
```

### Options

```javascript
const options = {
  url:  'http://example.com/posts.atom' // the url to get the feed from (atom / rss xml).
  refreshInterval: 30                   // how often the feed will be refreshed in seconds (defaults to 5).
}

const feed = new Feed(options)


```

### Api

```javascript
.top(n, t)    // returns Observable of n number of most recent articles in the feed, emitting one 
              // every t seconds. Defaults to 10 articles every 2 seconds.

.size()       // returns the number of articles in the feed.

.titles()     // returns an array of all the titles in the feed.
```

### Events

```javascript
.on('loading', msg => console.log(msg))   // when the feed starts loading, a message is emitted.

.on('error', err => console.log(err))     // when there's an error, an event is emitted with the 
                                          // error object.

.on('ready', msg => console.log(msg))     // when the feed is ready to use, a message is emitted.
                                          // once ready, use the api on your feed object.
```

### Commands

Run nodemon for development
```sh
npm start
```

Run tests and watch for changes for development
```sh
npm test
```

Run tests once
```sh
npm run tests-once
```

Build
```sh
npm run build
```

Run example
```sh
npm run example
```
