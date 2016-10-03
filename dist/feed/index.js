'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Feed = exports.Article = undefined;

var _article = require('./article.class');

var _article2 = _interopRequireDefault(_article);

var _feed = require('./feed.class');

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Article = _article2.default;
exports.Feed = _feed2.default;
exports.default = _feed2.default;