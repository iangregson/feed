'use strict';

var _chai = require('chai');

var _scheduler = require('./scheduler');

var _scheduler2 = _interopRequireDefault(_scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('scheduler', function () {

    it('should have a scheduler() method', function () {
        (0, _chai.expect)(_scheduler2.default).to.be.a('function');
    });
});