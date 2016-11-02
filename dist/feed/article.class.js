'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function Article(props) {
    var _this = this;

    _classCallCheck(this, Article);

    var articleProperties = ['title', 'description', 'author', 'date', 'pubdate', 'link']; // TODO put these in a config file

    if (!props) throw new Error('An article has to be created from an article object');

    Object.keys(props).forEach(function (key) {
        if (articleProperties.indexOf(key) > -1) _this[key] = props[key];
    });
};

exports.default = Article;