import { expect } from 'chai'

import { Feed } from './feed.class'

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
        
})
    