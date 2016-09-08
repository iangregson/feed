import Feed from './feed'

export default function App(url = process.env.URL) {
    let feed
    feed = new Feed({url})
    feed.on('loading', (data) => console.log(data))
    feed.on('error', (e) => console.log(e))
    feed.on('ready', (data) => console.log(data))
    feed.init()
    // TODO: fix this
    // feed.top()
    //     .subscribe(
    //         i => console.log(i),
    //         e => console.log(e),
    //         d => console.log('Done!')
    //     )
}