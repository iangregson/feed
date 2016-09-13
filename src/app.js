import Feed from './feed'

export default function App(url = process.env.URL) {
    const feed = new Feed({url})
    feed.on('loading', (data) => console.log(data))
    feed.on('error', (error) => console.log(error))
    feed.on('ready', (data) => { console.log(data); listTitles(5,1) })
    feed.init()

    function listTitles(n, t) {
        feed.top(n,t)
        .subscribe(
            i => console.log(i.title),
            e => console.log(e),
            d => listTitles(n, t)
        )
    }
}