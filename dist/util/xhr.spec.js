'use strict';

var _chai = require('chai');

var _Observable = require('rxjs/Observable');

var _xhr = require('./xhr');

var xhr = _interopRequireWildcard(_xhr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('The xhr module', function () {

    it('should have a get(url) method that returns a promise of the response body for a given url', function () {
        (0, _chai.expect)(xhr.get).to.be.a('function');
        (0, _chai.expect)(xhr.get('http://google.com')).to.be.a('promise');
        (0, _chai.expect)(xhr.get('http://google.com').then).to.be.a('function');
    });

    it('should have a getStream(url) method that returns a promise of the response stream for a given url', function () {
        (0, _chai.expect)(xhr.get).to.be.a('function');
        (0, _chai.expect)(xhr.getStream('http://google.com')).to.be.a('promise');
        (0, _chai.expect)(xhr.getStream('http://google.com').then).to.be.a('function');
    });

    it('should have a getObservable(url) method that returns a an observable of the response body for a given url', function (done) {
        (0, _chai.expect)(xhr.getObservable).to.be.a('function');
        (0, _chai.expect)(xhr.getObservable('http://google.com')).to.be.a('promise');
        xhr.getObservable('http://google.com').then(function (res) {
            (0, _chai.expect)(res).to.be.ok;
            (0, _chai.expect)(res).to.be.a('object').to.have.property('source');
            (0, _chai.expect)(res.subscribe).to.be.a('function');
            done();
        }).catch(function (e) {
            (0, _chai.expect)(res).to.be.ok;
            (0, _chai.expect)(res).to.be.a('object').to.have.property('source');
            (0, _chai.expect)(res.subscribe).to.be.a('function');
            done();
        });
    });
});