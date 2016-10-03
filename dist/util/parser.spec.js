'use strict';

var _chai = require('chai');

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _xhr = require('./xhr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('xml parser', function () {

    it('should have a observableXmlStream() method', function () {
        (0, _chai.expect)(_parser2.default).to.be.a('function');
    });

    it('should take a stream of response', function (done) {
        (0, _xhr.getStream)('http://blog.samaltman.com/posts.atom').then(function (res) {
            (0, _chai.expect)((0, _parser2.default)(res)).to.be.ok;
            done();
        }).catch(function (e) {
            assert.fail(e);
            done();
        });
    });

    it('should return an observable of the parsed stream', function (done) {
        (0, _xhr.getStream)('http://blog.samaltman.com/posts.atom').then(function (res) {
            (0, _chai.expect)((0, _parser2.default)(res)).to.be.ok;
            (0, _chai.expect)((0, _parser2.default)(res).subscribe).to.be.a('function');
            done();
        }).catch(function (e) {
            assert.fail(e);
            done();
        });
    });
});