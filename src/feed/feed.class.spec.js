import { expect } from 'chai'

import Feed from './feed.class'
import Article from './article.class'

const dummyFeed = {
    url: 'http://blog.samaltman.com/posts.atom'
}

const dummyMeta = {
    title: 'Dummy feed', 
    link: 'http://blog.samaltman.com/',
    xmlurl: 'http://blog.samaltman.com/posts.atom', 
    date: '1 September 2016',
    pubdate: '1 September 2015',
    author: 'Sam Altman',
    copyright: 'Sam Altman 2016'
}

let feed

describe('feed class', () => {

    beforeEach(() => {
        feed = new Feed(dummyFeed)
        feed.setMeta(dummyMeta)
    })
    
    it('should be a function', () => {
        expect(Feed).to.be.a('function')
    })

    it('should construct a new feed from a given object', () => {
        expect(feed).to.be.a('object').to.be.instanceOf(Feed)
    })

    it('should have a setMeta method that places the feed properties onto the class from an input object', () => {
        expect(feed.setMeta).to.be.a('function')
        feed.setMeta(dummyMeta)
        expect(feed).to.be.a('object').to.have.property('title').that.is.a('string')
        expect(feed).to.be.a('object').to.have.property('link').that.is.a('string')
        expect(feed).to.be.a('object').to.have.property('xmlurl').that.is.a('string')
        expect(feed).to.be.a('object').to.have.property('author').that.is.a('string')
        expect(feed).to.be.a('object').to.have.property('copyright').that.is.a('string')
        expect(feed).to.be.a('object').to.have.property('date').that.is.a('string') 
    })

    it('should have a getFeed() method that retrieves a feed and emits an event for each entry and when complete', (done) => {
        expect(feed.getFeed).to.be.a('function')
        feed.on('loading', (data) => expect(data).to.equal('Loading ' + feed._url + '...'))
        feed.on('newEntry', (entry) => expect(entry).to.be.instanceOf(Article))
        feed.on('ready', (data) => { expect(data).to.be.a('string').to.contain('Finished reading ' + feed._url); done(); })
        feed.on('error', (error) => assert.fail(error))
        feed.getFeed(feed._url)
    })
    
    it('should have a toDate() method that returns a JS date from a string', () => {
        expect(feed.toDate).to.be.a('function')
        expect(feed.toDate(feed.date)).to.be.instanceOf(Date)
    })

    it('should have a toDate() method that returns a JS date from a string or false if an invalid date', () => {
        expect(feed.toDate).to.be.a('function')
        expect(feed.toDate(feed.date.toString())).to.be.instanceOf(Date)
        expect(feed.toDate('nonsensedate')).to.be.false.to.not.be.instanceOf(Date)
    })

    it('should expose an event emitter emit() method to publish events', (done) => {
        expect(new Feed(dummyFeed).emit).to.be.a('function')
        let feed = new Feed(dummyFeed)
        feed.on('event', 
            (data) => {
                expect(data).to.be.a('string').to.equal('Test event')
                done()
            }
        )
        feed.emit('event', 'Test event')
    })

    it('should expose an event emitter on() method to receive events', (done) => {
        expect(new Feed(dummyFeed).on).to.be.a('function')
        let feed = new Feed(dummyFeed)
        feed.on('event', 
            (data) => {
                expect(data).to.be.a('string').to.equal('Test event')
                done()
            }
        )
        feed.emit('event', 'Test event')
    })

    it('should have an addEntry method that adds a new article to the entries collection', () => {
        expect(feed.addEntry).to.be.a('function')
        let length = feed.entries.length
        feed.addEntry({article: 'New article'})
        expect(feed.entries.length).to.equal(length + 1)   
        expect(feed.entries[length]).to.be.a('object').to.have.property('article').to.equal('New article')      
    })

    it('should have a poll method that checks the feed for updates', () => {
        expect(feed.poll).to.be.a('function')
    })

    it('should have a titles method that returns a list of all the article titles', () => {
        expect(feed.titles).to.be.a('function')
        expect(feed.titles()).to.be.a('array').to.have.length(feed.entries.length)
    })
    
    it('should have a top method that returns an observable of the first given number of items in the feed', () => {
        expect(feed.top).to.be.a('function')  
    })  
    
})
