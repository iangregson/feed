import { getStream } from './xhr'
import { observableXmlStream } from './parser'
import { article } from './article.class'
import { feed, getFeed, refreshFeed } from './feed.class'
import { Ticker, Ticker2 } from './ticker'
import { Observable } from 'rxjs'

export function app() {
    const url = 'http://blog.samaltman.com/posts.atom'

    getFeed(url)
    .then(
        res => refreshFeed(res)
    )
    .catch(e => console.log(e))

    // let ticker = new Ticker(url)

    // ticker.on('starting', (data) => console.log('Starting to read', data))
    // ticker.on('newEntry', () => console.log('New entry read'))
    // ticker.on('completeFeed', () => console.log('Reading feed complete!'))
    // ticker.on('error', (error) => console.log(error))
    // ticker.read()

}