import { EventEmitter } from 'events'
import Rx from 'rxjs'

import { observableXmlStream, xhr, every } from '../util'
import Article from './article.class';

export default class Feed extends EventEmitter {
    constructor(props) {
        super(props)
        if (!props.url) throw new Error('Can\'t create a new feed - we need a url to fetch it from.')
        this.url = props.url
        this.refreshInterval = props.refreshInterval || 5
        this.entries = []
        this.sortedEntries = []
    }

    init() {
        let feed = this
        feed.getFeed(feed.url)
        feed.on('loaded', () => {
            every(feed.refreshInterval, feed.poll, feed)
            feed.sortByDate(feed)
                .then(sorted => feed.emit('ready', 'Finished reading and sorting ' + feed.url + '. There are ' + feed.titles().length + ' articles in the feed.' + '\n The last update was on ' + feed.date))
                .catch(error => feed.emit('error', error))
        })
        feed.on('reloaded', () => {
            feed.sortByDate(feed)
                .then(sorted => feed.emit('updateComplete', 'Finished reading and sorting ' + feed.url + '. There are ' + feed.titles().length + ' articles in the feed.' + '\n The last update was on ' + feed.date))
                .catch(error => feed.emit('error', error))
        })        
    }

    setMeta(meta) {
        const feedProperties = ['title', 'link', 'xmlurl', 'date', 'pubdate', 'author', 'copyright'] // TODO put these in a config file
        if (!meta) throw new Error('A feed\'s meta information has to be created from a feed meta object')

        Object.keys(meta).forEach(
            key => {
                if (feedProperties.indexOf(key) > -1) this[key] = meta[key]
            }
        )
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

    titles() {
        return this.entries.map(entry => entry.title)
    }

    // Get the first ten articles and send them out at an interval of 5 seconds
    top(x = 10, t = 2) {
        return Rx.Observable
                .from(this.sortedEntries)
                .take(x)
                .zip(Rx.Observable.interval(t*1000), (a, b) => a)
    }

    toDate(s) {
        return (new Date(s) == 'Invalid Date') ? false : new Date(s) 
    }

    getFeed(url, refresh = false) {
        this.emit('loading', 'Loading ' + url + '...')
        if (refresh) this.entries = []
        xhr.getStream(url)
        .then(
            res => observableXmlStream(res)
            .subscribe(
                entry => {
                    if (!this.meta) this.setMeta(entry.meta)
                    this.addEntry(new Article(entry))
                    this.emit('entry', new Article(entry))
                },
                error => {
                    this.emit('error', error)
                },
                complete => {
                    if (!refresh) this.emit('loaded')
                    else this.emit('reloaded')
                }
            )
        )
        .catch(e => this.emit('error', e))
    }

    poll(feed) {
        feed.emit('polling')
        xhr.getStream(feed.url)
        .then(
            res => observableXmlStream(res)
            .take(1)
            .subscribe(
                entry => { if (feed.toDate(entry.meta.date) > feed.date) feed.getFeed(feed.url, true) },
                error => feed.emit('error', error),
                complete => feed.emit('pollComplete')))
        .catch(e => feed.emit('error', e))
    }

    sortByDate(feed) {
        return new Promise(
            (resolve, reject) => {
                feed.sortedEntries = 
                    feed.entries
                    .map(entry => {
                        entry._date = feed.toDate(entry.pubdate)
                        if (!entry._date) reject(new Error('Articles contain invalid dates'))
                        return entry })
                    .sort((a, b) => b._date - a._date)
                resolve(feed.sortedEntries)
            }
        )
    }
}
