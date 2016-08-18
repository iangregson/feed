import { expect } from 'chai'

import { article } from './article.class'

const dummyArticle = {
    title: 'New article',
    description: 'Article body...',
    author: 'Ian Gregson',
    date: new Date(),
    link: 'http://github.com/iangregson'
}
describe('article class', () => {
    
    it('should be a function', () => {
        expect(article).to.be.a('function')
    });

    it('should construct a new article from a given object', () => {
        expect(new article(dummyArticle)).to.be.a('object').to.be.instanceOf(article)
        expect(new article(dummyArticle)).to.be.a('object').to.have.property('title').that.is.a('string')
        expect(new article(dummyArticle)).to.be.a('object').to.have.property('description').that.is.a('string')
        expect(new article(dummyArticle)).to.be.a('object').to.have.property('author').that.is.a('string')
        expect(new article(dummyArticle)).to.be.a('object').to.have.property('link').that.is.a('string')
        expect(new article(dummyArticle)).to.be.a('object').to.have.property('date').to.be.instanceOf(Date)
    });
        
});
    