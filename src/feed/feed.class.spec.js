import { expect } from 'chai'

import Feed from './feed.class'

const dummyFeed = {
    title: 'New feed',
    link: 'http://feedlcoation.com',
    xmlurl: 'http://feedlcoation.com/atom.xml',
    date: new Date(),
    author: 'Ian Gregson',
    copyright: 'Ian Gregson 2016'
}

describe('feed class', () => {
    
    it('should be a function', () => {
        expect(Feed).to.be.a('function')
    })

    it('should construct a new feed from a given object', () => {
        expect(new Feed(dummyFeed)).to.be.a('object').to.be.instanceOf(Feed)
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('title').that.is.a('string')
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('link').that.is.a('string')
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('xmlurl').that.is.a('string')
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('author').that.is.a('string')
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('copyright').that.is.a('string')
        expect(new Feed(dummyFeed)).to.be.a('object').to.have.property('date').to.be.instanceOf(Date)
    })
    
    it('should have a toDate() method that returns a JS date from a string', () => {
        let feed = new Feed(dummyFeed)
        expect(feed.toDate).to.be.a('function')
        expect(feed.toDate(feed.date)).to.be.instanceOf(Date)
    });

    it('should have a toDate() method that returns a JS date from a string or false if an invalid date', () => {
        let feed = new Feed(dummyFeed)
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
        
})

// // From old ticker module
// it('should have a read() method that retrieves a feed and emits an event for each entry and when complete', (done) => {
//     let ticker = new Ticker(url)        
//     ticker.on('starting', (data) => expect(data).to.equal(url))
//     ticker.on('newEntry', (entry) => expect(entry).to.be.instanceOf(Article))
//     ticker.on('completeFeed', (data) => { expect(data).to.be.a('string').to.equal('Finished reading ' + url); done(); })
//     ticker.on('error', (error) => assert.fail(error))
//     ticker.read()
// })