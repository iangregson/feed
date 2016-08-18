import { getStream } from './xhr'
import { observableXmlStream } from './parser'
import { article } from './article.class'

export function app() {
    const url = 'http://blog.samaltman.com/posts.atom'

    getStream(url).then(res => {
        let entries = []
        observableXmlStream(res)
        .subscribe(
            (entry) => entries.push(new article(entry)),
            (error) => { throw new Error(error) },
            () => console.log('Completed!\n', entries)
        )
    })
    .catch(e => console.log(e))
}