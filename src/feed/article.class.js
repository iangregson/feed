export default class Article {
    constructor(props) {
        const articleProperties = ['title', 'description', 'author', 'date', 'link'] // TODO put these in a config file

        if (!props) throw new Error('An article has to be created from an article object')

        Object.keys(props).forEach(
            key => {
                if (articleProperties.indexOf(key) > -1) this[key] = props[key]
            }
        )
    }
}