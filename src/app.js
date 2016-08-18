import { get, getObservable, getStream } from './xhr'

export function app() {
    const url = 'http://blog.samaltman.com/posts.atom'
    getObservable(url).then(
        res => res.subscribe(x => console.log(x))
    )
}