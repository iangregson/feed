import { observableXmlStream, xhr, scheduler } from '../util'
import { Article } from './article.class';
import { EventEmitter } from 'events'

export default class Feed extends EventEmitter {
    constructor(props) {
        super(props)
        const feedProperties = ['title', 'link', 'xmlurl', 'date', 'pubdate', 'author', 'copyright']

        if (!props) throw new Error('A feed has to be created from a feed object')

        Object.keys(props).forEach(
            key => {
                if (feedProperties.indexOf(key) > -1) this[key] = props[key]
            }
        )
        this.entries = []
    }

    on(...args) {
        return super.on(...args)
    }

    emit(...args) {
        return super.emit(...args);
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

// // From old ticker module 
// read() {
//     this.emit('starting', this.url)
//     getStream(this.url)
//     .then(res => {
//         observableXmlStream(res)
//         .subscribe(
//             (entry) => this.emit('newEntry', new Article(entry)),
//             (error) => this.emit('error', error),
//             () => this.emit('completeFeed', 'Finished reading ' + this.url)
//         )
//     })
//     .catch(e => console.log(e))
// }