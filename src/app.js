import { get } from './xhr'

export function app() {
    get('http://blog.samaltman.com/posts.atom').then(res => console.log('Got response'))
                            .catch(e => console.log('Got error: ', e))
}