import { expect } from 'chai'

import scheduler from './scheduler';

describe('scheduler', () => {
    
    it('should have a scheduler() method', () => {
        expect(scheduler).to.be.a('function')
    })
})
    