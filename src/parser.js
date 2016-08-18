import { default as FeedParser } from 'feedparser'
import * as RxNode from 'rx-node'

export function observableXmlStream(stream) {
    const parser = new FeedParser()
    stream.pipe(parser)
    parser.on('error', (e) => { throw new Error(e) })
    return RxNode.fromStream(parser, 'end', 'data')
}