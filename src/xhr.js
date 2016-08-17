import * as http from 'http'
import * as RxNode from 'rx-node'
import Observable from 'rxjs/Observable'

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

// Returns an Observable of the response for a given url
export function getObservable(url) {
    let subscription
    console.log('trying to get ', url)
    http.get(url, res => {
        res.setEncoding('utf8')
        console.log('got response ', res.statusCode)
        subscription = RxNode.fromStream(res)
    })
    .on('error', e => {
        console.log('got error ', e)
        subscription = Observable.from(new Map(e))
    })
    console.log('getObs..', subscription);
    return subscription
}