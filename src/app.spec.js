import { expect } from 'chai'

import { app } from './app'


describe('The app', () => {
    
    it('should be a function', () => {
        expect(app).to.be.a('function')
    })
        
})
    