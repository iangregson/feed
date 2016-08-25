import { expect } from 'chai'

import { Article } from './article.class';
import { Ticker } from './ticker'

const url = 'http://blog.samaltman.com/posts.atom'

describe('Ticker', () => {
    
    it('should be a function', () => {
        expect(Ticker).to.be.a('function')
    })
    
    it('should expose an event emitter emit() method to publish events', (done) => {
        expect(new Ticker(url).emit).to.be.a('function')
        let ticker = new Ticker(url)
        ticker.on('event', 
            (data) => {
                expect(data).to.be.a('string').to.equal('Test event')
                done()
            }
        )
        ticker.emit('event', 'Test event')
    })

    it('should expose an event emitter on() method to receive events', (done) => {
        expect(new Ticker(url).on).to.be.a('function')
        let ticker = new Ticker(url)
        ticker.on('event', 
            (data) => {
                expect(data).to.be.a('string').to.equal('Test event')
                done()
            }
        )
        ticker.emit('event', 'Test event')
    })
    
    it('should have a read() method that retrieves a feed and emits an event for each entry and when complete', (done) => {
        let ticker = new Ticker(url)        
        ticker.on('starting', (data) => expect(data).to.equal(url))
        ticker.on('newEntry', (entry) => expect(entry).to.be.instanceOf(Article))
        ticker.on('completeFeed', (data) => { expect(data).to.be.a('string').to.equal('Finished reading ' + url); done(); })
        ticker.on('error', (error) => assert.fail(error))
        ticker.read()
    });
        
})