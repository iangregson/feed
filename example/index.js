import { Feed } from '../'

const feed = new Feed({ url: 'http://blog.samaltman.com/posts.atom' })

feed.on('ready', () => feed.top().subscribe(item => console.log(item.title)))

feed.init()