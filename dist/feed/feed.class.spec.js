'use strict';

var _chai = require('chai');

var _feed = require('./feed.class');

var _feed2 = _interopRequireDefault(_feed);

var _article = require('./article.class');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dummyFeed = {
    url: 'http://blog.samaltman.com/posts.atom'
};

var dummyMeta = {
    title: 'Dummy feed',
    link: 'http://blog.samaltman.com/',
    xmlurl: 'http://blog.samaltman.com/posts.atom',
    date: '1 September 2016',
    pubdate: '1 September 2015',
    author: 'Sam Altman',
    copyright: 'Sam Altman 2016'
};

var feed = void 0;

describe('feed class', function () {

    beforeEach(function () {
        feed = new _feed2.default(dummyFeed);
        feed.setMeta(dummyMeta);
    });

    it('should be a function', function () {
        (0, _chai.expect)(_feed2.default).to.be.a('function');
    });

    it('should construct a new feed from a given object', function () {
        (0, _chai.expect)(feed).to.be.a('object').to.be.instanceOf(_feed2.default);
    });

    it('should have a setMeta method that places the feed properties onto the class from an input object', function () {
        (0, _chai.expect)(feed.setMeta).to.be.a('function');
        feed.setMeta(dummyMeta);
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('title').that.is.a('string');
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('link').that.is.a('string');
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('xmlurl').that.is.a('string');
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('author').that.is.a('string');
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('copyright').that.is.a('string');
        (0, _chai.expect)(feed).to.be.a('object').to.have.property('date').that.is.a('string');
    });

    it('should have a getFeed() method that retrieves a feed and emits an event for each entry and when complete', function (done) {
        (0, _chai.expect)(feed.getFeed).to.be.a('function');
        feed.on('loading', function (data) {
            return (0, _chai.expect)(data).to.equal('Loading ' + feed._url + '...');
        });
        feed.on('newEntry', function (entry) {
            return (0, _chai.expect)(entry).to.be.instanceOf(_article2.default);
        });
        feed.on('loaded', function (data) {
            (0, _chai.expect)(data).to.be.a('string').to.contain('Finished downloading ' + feed._url);done();
        });
        feed.on('error', function (error) {
            return assert.fail(error);
        });
        feed.getFeed(feed._url);
    });

    it('should have a toDate() method that returns a JS date from a string', function () {
        (0, _chai.expect)(feed.toDate).to.be.a('function');
        (0, _chai.expect)(feed.toDate(feed.date)).to.be.instanceOf(Date);
    });

    it('should have a toDate() method that returns a JS date from a string or false if an invalid date', function () {
        (0, _chai.expect)(feed.toDate).to.be.a('function');
        (0, _chai.expect)(feed.toDate(feed.date.toString())).to.be.instanceOf(Date);
        (0, _chai.expect)(feed.toDate('nonsensedate')).to.be.false.to.not.be.instanceOf(Date);
    });

    it('should expose an event emitter emit() method to publish events', function (done) {
        (0, _chai.expect)(new _feed2.default(dummyFeed).emit).to.be.a('function');
        var feed = new _feed2.default(dummyFeed);
        feed.on('event', function (data) {
            (0, _chai.expect)(data).to.be.a('string').to.equal('Test event');
            done();
        });
        feed.emit('event', 'Test event');
    });

    it('should expose an event emitter on() method to receive events', function (done) {
        (0, _chai.expect)(new _feed2.default(dummyFeed).on).to.be.a('function');
        var feed = new _feed2.default(dummyFeed);
        feed.on('event', function (data) {
            (0, _chai.expect)(data).to.be.a('string').to.equal('Test event');
            done();
        });
        feed.emit('event', 'Test event');
    });

    it('should have an addEntry method that adds a new article to the entries collection', function () {
        (0, _chai.expect)(feed.addEntry).to.be.a('function');
        var length = feed.entries.length;
        feed.addEntry({ article: 'New article' });
        (0, _chai.expect)(feed.entries.length).to.equal(length + 1);
        (0, _chai.expect)(feed.entries[length]).to.be.a('object').to.have.property('article').to.equal('New article');
    });

    it('should have a poll method that checks the feed for updates', function () {
        (0, _chai.expect)(feed.poll).to.be.a('function');
    });

    it('should have a titles method that returns a list of all the article titles', function () {
        (0, _chai.expect)(feed.titles).to.be.a('function');
        (0, _chai.expect)(feed.titles()).to.be.a('array').to.have.length(feed.entries.length);
    });

    it('should have a top method that returns an observable of the first given number of items in the feed', function (done) {
        (0, _chai.expect)(feed.top).to.be.a('function');
        (0, _chai.expect)(feed.top(5).subscribe).to.be.a('function');
        feed.on('ready', function () {
            var titles = [];
            feed.top(5, 0).subscribe(function (i) {
                return titles.push(i.title);
            }, function (e) {
                return assert.fail(e);
            }, function (c) {
                (0, _chai.expect)(titles).to.be.a('array').to.have.length(5);
                done();
            });
        });
        feed.init();
    });

    it('should have a sortByDate method that returns a promise', function () {
        (0, _chai.expect)(feed.sortByDate).to.be.a('function');
        (0, _chai.expect)(feed.sortByDate()).to.be.a('promise');
    });
});