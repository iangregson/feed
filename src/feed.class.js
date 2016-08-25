import { observableXmlStream } from './parser'
import { getStream } from './xhr'
import { Article } from './article.class';

export class Feed {
    constructor(props) {
        const feedProperties = ['title', 'link', 'xmlurl', 'date', 'pubdate', 'author', 'copyright']

        if (!props) throw new Error('A feed has to be created from a feed object')

        Object.keys(props).forEach(
            key => {
                if (feedProperties.indexOf(key) > -1) this[key] = props[key]
            }
        )
        this.entries = []
    }

    addEntry(entry) {
        this.entries.push(entry)
    }

    articles() {
        return this.entries.map(entry => entry.title)
    }

    toDate(s) {
        return (new Date(s) == 'Invalid Date') ? false : new Date(s) 
    }
}

// Returns promise of the fully downloaded and parsed feed
export function getFeed(url) {
    return new Promise(
        (resovle, reject) => {
            let feed
            getStream(url)
            .then(res => observableXmlStream(res)
            .subscribe(entry, error, complete))
            .catch(e => reject(e))

            function entry(entry) {
                if (!feed) feed = new Feed(entry.meta)
                feed.addEntry(new Article(entry))
            }
            function error(error) {
                reject(error)
            }
            function complete() {
                console.log('There are ' + feed.articles().length + ' articles in the feed.');
                resolve(feed)
            }
        }
    )
}

// Returns promise of the refreshed fully downloaded and parsed feed
// or resolves with false if there has not been an update
export function refreshFeed(existingFeed) {
    return new Promise(
        (resovle, reject) => {
            let feed
            getStream(existingFeed.xmlurl)
            .then(res => observableXmlStream(res)
            .subscribe(entry, error, complete))
            .catch(e => reject(e))

            function entry(entry) {
                if (!feed) feed = new Feed(entry.meta)
                feed.addEntry(new Article(entry))
            }
            function error(error) {
                reject(error)
            }
            function complete() {
                console.log('There are last update was ' + feed.date)
                resolve(feed)
            }
        }
    )
}

export class FeedCache {
    constructor(props) {
        this.cache = [];
    }

    cacheFeed(feed) {
        while (this.ids().includes(feed.xml.url)) {
            this.cache.splice()
        }
        this.cache.push({ id: feed.xmlurl, feed: feed })
        return feed.xmlurl
    }

    getFeed(id) {
        return 
    }

    ids() {
        return this.cache.map(entry => entry.id)
    }
}