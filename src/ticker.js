import { getStream } from './xhr'
import { observableXmlStream } from './parser'
import { Article } from './article.class'
import { EventEmitter } from 'events'
import { Observable } from 'rxjs'

export class Ticker extends EventEmitter {
    constructor(props) {
        super(props);
        this.url = props
    }
    
    on(...args) {
        return super.on(...args)
    }

    emit(...args) {
        return super.emit(...args);
    }

    read() {
        this.emit('starting', this.url)
        getStream(this.url)
        .then(res => {
            observableXmlStream(res)
            .subscribe(
                (entry) => this.emit('newEntry', new Article(entry)),
                (error) => this.emit('error', error),
                () => this.emit('completeFeed', 'Finished reading ' + this.url)
            )
        })
        .catch(e => console.log(e))
    }
}
