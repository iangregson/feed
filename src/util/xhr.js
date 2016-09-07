import * as http from 'http'
import * as RxNode from 'rx-node'
import { Observable, Map } from 'rxjs/Observable'

// Returns a promise that resovles the full response body for a given url
export function get(url) {
    return new Promise(
        (resolve, reject) => {
            http.get(url, res => {
                let body
                res.setEncoding('utf8');
                res.on('data', data => body += data)
                res.on('end', () => resolve(body))
                res.resume()
            })
            .on('error', e => {
                reject(e)
            })
        }
    )
}

// Returns a promise that resovles the response stream for a given url
export function getStream(url) {
    return new Promise(
        (resolve, reject) => {
            http.get(url, res => resolve(res))
            .on('error', e => reject(e))
        }
    )
}

// Returns an Observable of the response for a given url
export function getObservable(url) {
    return getStream(url).then(res => { 
        res.setEncoding('utf-8')
        return RxNode.fromStream(res)
    })
    .catch(e => Observable.from(new Map(e)))
}
