import { expect } from 'chai'

import observableXmlStream from './parser';
import { getStream } from './xhr'

describe('xml parser', () => {
    
    it('should have a observableXmlStream() method', () => {
        expect(observableXmlStream).to.be.a('function')
    });

    it('should take a stream of response', (done) => {
        getStream('http://blog.samaltman.com/posts.atom').then(
            res => {
                expect(observableXmlStream(res)).to.be.ok
                done()
            }
        ).catch(e => {
            assert.fail(e)
            done()
        })
    })

    it('should return an observable of the parsed stream', (done) => {
        getStream('http://blog.samaltman.com/posts.atom').then(
            res => {
                expect(observableXmlStream(res)).to.be.ok
                expect(observableXmlStream(res).subscribe).to.be.a('function')
                done()
            }
        ).catch(e => {
            assert.fail(e)
            done()
        })
    }) 
})
    