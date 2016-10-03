'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = observableXmlStream;

var _feedparser = require('feedparser');

var _feedparser2 = _interopRequireDefault(_feedparser);

var _rxNode = require('rx-node');

var RxNode = _interopRequireWildcard(_rxNode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function observableXmlStream(stream) {
    var parser = new _feedparser2.default();
    stream.pipe(parser);
    parser.on('error', function (e) {
        throw new Error(e);
    });
    return RxNode.fromStream(parser, 'end', 'data');
}