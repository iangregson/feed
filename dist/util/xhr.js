'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.getStream = getStream;
exports.getObservable = getObservable;

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _rxNode = require('rx-node');

var RxNode = _interopRequireWildcard(_rxNode);

var _Observable = require('rxjs/Observable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Returns a promise that resovles the full response body for a given url
function get(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var body = void 0;
            res.setEncoding('utf8');
            res.on('data', function (data) {
                return body += data;
            });
            res.on('end', function () {
                return resolve(body);
            });
            res.resume();
        }).on('error', function (e) {
            reject(e);
        });
    });
}

// Returns a promise that resovles the response stream for a given url
function getStream(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            return resolve(res);
        }).on('error', function (e) {
            return reject(e);
        });
    });
}

// Returns an Observable of the response for a given url
function getObservable(url) {
    return getStream(url).then(function (res) {
        res.setEncoding('utf-8');
        return RxNode.fromStream(res);
    }).catch(function (e) {
        return _Observable.Observable.from(new _Observable.Map(e));
    });
}