'use strict';

var _chai = require('chai');

var _article = require('./article.class');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dummyArticle = {
    title: 'New article',
    description: 'Article body...',
    author: 'Ian Gregson',
    date: new Date(),
    link: 'http://github.com/iangregson'
};
describe('article class', function () {

    it('should be a function', function () {
        (0, _chai.expect)(_article2.default).to.be.a('function');
    });

    it('should construct a new article from a given object', function () {
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.be.instanceOf(_article2.default);
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.have.property('title').that.is.a('string');
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.have.property('description').that.is.a('string');
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.have.property('author').that.is.a('string');
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.have.property('link').that.is.a('string');
        (0, _chai.expect)(new _article2.default(dummyArticle)).to.be.a('object').to.have.property('date').to.be.instanceOf(Date);
    });
});