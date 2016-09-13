import { EventEmitter } from 'events'
import Rx from 'rxjs'

import { observableXmlStream, xhr, every } from '../util'
import Article from './article.class';

export default class Feed extends EventEmitter {
    constructor(props) {
        super(props)
        if (!props.url) throw new Error('Can\'t create a new feed - we need a url to fetch it from.')
        this._url = props.url
        this.refreshInterval = props.refreshInterval || 5
        this.entries = []
        this._sortedEntries = []
    }

    init() {
        let self = this
        self.getFeed(self._url)
        self.on('loaded', () => {
            every(self.refreshInterval, self.poll, self)
            self.sortByDate(self)
                .then(sorted => self.emit('ready', 'Finished reading and sorting ' + self._url + '. There are ' + self.titles().length + ' articles in the feed.' + '\n The last update was on ' + self.date))
                .catch(error => self.emit('error', error))
        })
        self.on('reloaded', () => {
            console.log('just reloaded the feed!');
            // self._sortedEntries = [{title: 'Test updates!'}]
            self.sortByDate(self)
                .then(sorted => self.emit('updateComplete', 'Finished reading and sorting ' + self._url + '. There are ' + self.titles().length + ' articles in the feed.' + '\n The last update was on ' + self.date))
                .catch(error => self.emit('error', error))
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
                .from(this._sortedEntries)
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
                    if (!refresh) this.emit('loaded', 'Finished downloading ' + this._url + '. There are ' + this.titles().length + ' articles in the feed.' + '\n The last update was on ' + this.date)
                    else this.emit('reloaded', 'Finished updating ' + this._url + '. There are ' + this.titles().length + ' articles in the feed.' + '\n The last update was on ' + this.date)
                }
            )
        )
        .catch(e => this.emit('error', e))
    }

    poll(self) {
        self.emit('polling')
        xhr.getStream(self._url)
        .then(
            res => observableXmlStream(res)
            .take(1)
            .subscribe(
                entry => { if (self.toDate(entry.meta.date) > self.date) self.getFeed(self._url, true) },
                error => self.emit('error', error),
                complete => self.emit('pollComplete')))
        .catch(e => self.emit('error', e))
    }

    sortByDate(self) {
        return new Promise(
            (resolve, reject) => {
                self._sortedEntries = 
                    self.entries
                    .map(entry => {
                        entry._date = self.toDate(entry.date)
                        if (!entry._date) reject(new Error('Articles contain invalid dates'))
                        return entry })
                    .sort((a, b) => b._date - a._date)
                resolve(self._sortedEntries)
            }
        )
    }
}
