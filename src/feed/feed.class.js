import { EventEmitter } from 'events'
import Rx from 'rxjs'

import { observableXmlStream, xhr, scheduler } from '../util'
import Article from './article.class';

export default class Feed extends EventEmitter {
    constructor(props) {
        super(props)
        if (!props.url) throw new Error('Can\'t create a new feed - We need a url to fetch the feed from.')
        this._url = props.url
        this._refreshInterval = props.refreshInterval || 5
        this.entries = []
    }

    init() {
        this.getFeed(this._url)
    }

    setMeta(meta) {
        const feedProperties = ['title', 'link', 'xmlurl', 'date', 'pubdate', 'author', 'copyright']
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
        return Rx.Observable.from(this.entries).take(x).zip(Rx.Observable.interval(t*1000), (a, b) => a)
    }

    toDate(s) {
        return (new Date(s) == 'Invalid Date') ? false : new Date(s) 
    }

    getFeed(url) {
        this.emit('loading', 'Loading ' + url + '...')
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
                    this.emit('ready', 'Finished reading ' + this._url + '. There are ' + this.titles().length + ' articles in the feed.')
                }
            )
        )
        .catch(e => this.emit('error', e))
    }

    poll(url = this._url, lastUpdated = this.toDate(_date)) {
        
    }
}
