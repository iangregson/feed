import { expect } from 'chai'
import { Observable } from 'rxjs/Observable'

import * as xhr from './xhr'


describe('The xhr module', () => {
    
    it('should have a get(url) method that returns a promise of the response body for a given url', () => {
        expect(xhr.get).to.be.a('function')
        expect(xhr.get('http://google.com')).to.be.a('promise')
    })

    it('should have a getObservable(url) method that returns a an observable of the response body for a given url', () => {
        expect(xhr.getObservable).to.be.a('function')
        console.log(xhr.getObservable('http://google.com'))
        expect(xhr.getObservable('http://google.com')).to.be.instanceOf(Observable)
    })
})
