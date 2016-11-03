# Scruffy
A node.js service for turning an RSS feed into a JSON ticker

[![Build Status](https://travis-ci.org/iangregson/scruffy.svg?branch=master)](https://travis-ci.org/iangregson/scruffy)

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
  url:  'http://example.com/posts.atom' // the url to get the feed from (atom / rss xml)
  refreshInterval: 30                   // how often the feed will be refreshed in seconds (defaults to 5)
}

const feed = new Feed(options)


```

### Api

```javascript
.top(n, t)    // returns Observable of n number of most recent articles in the feed, emitting one every t seconds. Defaults to 10 articles every 2 seconds  

.size()       // returns the number of articles in the feed

.titles()     // returns an array of all the titles in the feed
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
