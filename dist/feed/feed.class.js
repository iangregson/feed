'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _util = require('../util');

var _article = require('./article.class');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feed = function (_EventEmitter) {
    _inherits(Feed, _EventEmitter);

    function Feed(props) {
        _classCallCheck(this, Feed);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Feed).call(this, props));

        if (!props.url) throw new Error('Can\'t create a new feed - we need a url to fetch it from.');
        _this.url = props.url;
        _this.refreshInterval = props.refreshInterval || 5;
        _this.entries = [];
        _this.sortedEntries = [];
        return _this;
    }

    _createClass(Feed, [{
        key: 'init',
        value: function init() {
            var feed = this;
            feed.getFeed(feed.url);
            feed.on('loaded', function () {
                (0, _util.every)(feed.refreshInterval, feed.poll, feed);
                feed.sortByDate(feed).then(function (sorted) {
                    return feed.emit('ready', 'Finished reading and sorting ' + feed.url + '. There are ' + feed.titles().length + ' articles in the feed.' + '\n The last update was on ' + feed.date);
                }).catch(function (error) {
                    return feed.emit('error', error);
                });
            });
            feed.on('reloaded', function () {
                feed.sortByDate(feed).then(function (sorted) {
                    return feed.emit('updateComplete', 'Finished reading and sorting ' + feed.url + '. There are ' + feed.titles().length + ' articles in the feed.' + '\n The last update was on ' + feed.date);
                }).catch(function (error) {
                    return feed.emit('error', error);
                });
            });
        }
    }, {
        key: 'setMeta',
        value: function setMeta(meta) {
            var _this2 = this;

            var feedProperties = ['title', 'link', 'xmlurl', 'date', 'pubdate', 'author', 'copyright']; // TODO put these in a config file
            if (!meta) throw new Error('A feed\'s meta information has to be created from a feed meta object');

            Object.keys(meta).forEach(function (key) {
                if (feedProperties.indexOf(key) > -1) _this2[key] = meta[key];
            });
        }
    }, {
        key: 'on',
        value: function on() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Object.getPrototypeOf(Feed.prototype), 'on', this)).call.apply(_get2, [this].concat(args));
        }
    }, {
        key: 'emit',
        value: function emit() {
            var _get3;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return (_get3 = _get(Object.getPrototypeOf(Feed.prototype), 'emit', this)).call.apply(_get3, [this].concat(args));
        }
    }, {
        key: 'addEntry',
        value: function addEntry(entry) {
            this.entries.push(entry);
        }
    }, {
        key: 'titles',
        value: function titles() {
            return this.entries.map(function (entry) {
                return entry.title;
            });
        }

        // Get the first ten articles and send them out at an interval of 5 seconds

    }, {
        key: 'top',
        value: function top() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
            var t = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

            return _rxjs2.default.Observable.from(this.sortedEntries).take(x).zip(_rxjs2.default.Observable.interval(t * 1000), function (a, b) {
                return a;
            });
        }
    }, {
        key: 'toDate',
        value: function toDate(s) {
            return new Date(s) == 'Invalid Date' ? false : new Date(s);
        }
    }, {
        key: 'getFeed',
        value: function getFeed(url) {
            var _this3 = this;

            var refresh = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            this.emit('loading', 'Loading ' + url + '...');
            if (refresh) this.entries = [];
            _util.xhr.getStream(url).then(function (res) {
                return (0, _util.observableXmlStream)(res).subscribe(function (entry) {
                    if (!_this3.meta) _this3.setMeta(entry.meta);
                    _this3.addEntry(new _article2.default(entry));
                    _this3.emit('entry', new _article2.default(entry));
                }, function (error) {
                    _this3.emit('error', error);
                }, function (complete) {
                    if (!refresh) _this3.emit('loaded', 'Finished downloading');else _this3.emit('reloaded');
                });
            }).catch(function (e) {
                return _this3.emit('error', e);
            });
        }
    }, {
        key: 'poll',
        value: function poll(feed) {
            feed.emit('polling');
            _util.xhr.getStream(feed.url).then(function (res) {
                return (0, _util.observableXmlStream)(res).take(1).subscribe(function (entry) {
                    if (feed.toDate(entry.meta.date) > feed.date) feed.getFeed(feed.url, true);
                }, function (error) {
                    return feed.emit('error', error);
                }, function (complete) {
                    return feed.emit('pollComplete');
                });
            }).catch(function (e) {
                return feed.emit('error', e);
            });
        }
    }, {
        key: 'sortByDate',
        value: function sortByDate(feed) {
            return new Promise(function (resolve, reject) {
                feed.sortedEntries = feed.entries.map(function (entry) {
                    entry._date = feed.toDate(entry.pubdate);
                    if (!entry._date) reject(new Error('Articles contain invalid dates'));
                    return entry;
                }).sort(function (a, b) {
                    return b._date - a._date;
                });
                resolve(feed.sortedEntries);
            });
        }
    }, {
        key: 'size',
        value: function size() {
            return this.entries.length;
        }
    }]);

    return Feed;
}(_events.EventEmitter);

exports.default = Feed;