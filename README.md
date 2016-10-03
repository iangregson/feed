# Feed
A node.js service for turning an RSS feed into a JSON ticker

[![Build Status](https://travis-ci.org/iangregson/feed.svg?branch=master)](https://travis-ci.org/iangregson/feed)

## Example:

```javascript
import { Feed } from 'scruffy'

const feed = new Feed({ url: 'http://blog.samaltman.com/posts.atom' })

feed.on('ready', () => feed.top().subscribe(item => console.log(item.title)))

feed.init()
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