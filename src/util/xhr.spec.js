import { expect } from 'chai'
import { RefCountObservable, Observable } from 'rxjs/Observable'

import * as xhr from './xhr'


describe('The xhr module', () => {
    
    it('should have a get(url) method that returns a promise of the response body for a given url', () => {
        expect(xhr.get).to.be.a('function')
        expect(xhr.get('http://google.com')).to.be.a('promise')
        expect(xhr.get('http://google.com').then).to.be.a('function')
    })
    
    it('should have a getStream(url) method that returns a promise of the response stream for a given url', () => {
        expect(xhr.get).to.be.a('function')
        expect(xhr.getStream('http://google.com')).to.be.a('promise')
        expect(xhr.getStream('http://google.com').then).to.be.a('function')
    })

    it('should have a getObservable(url) method that returns a an observable of the response body for a given url', (done) => {
        expect(xhr.getObservable).to.be.a('function')
        expect(xhr.getObservable('http://google.com')).to.be.a('promise')
        xhr.getObservable('http://google.com').then(
            res => {
                expect(res).to.be.ok
                expect(res).to.be.a('object').to.have.property('source')
                expect(res.subscribe).to.be.a('function')
                done()
            }
        ).catch(
            e => {
                expect(res).to.be.ok
                expect(res).to.be.a('object').to.have.property('source')
                expect(res.subscribe).to.be.a('function')
                done()
            }
        )
    })
})
