import Feed from './feed'
import { every } from './util'

export default function App(url = process.env.URL) {
    const feed = new Feed({url})
    feed.on('loading', (data) => console.log(data))
    feed.on('error', (e) => console.log(e))
    feed.on('ready', (data) => listTitles(5,1))
    feed.init()

    function listTitles(n, t) {
        return feed.top(n,t)
        .subscribe(
            i => console.log(i.title),
            e => console.log(e),
            d => listTitles(n, t)
        )
    }
}