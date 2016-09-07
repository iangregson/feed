
const arr = [
    { id: '12345', object: {}, date: 1 },
    { id: '12345', object: {}, date: 1 },
    { id: '67890', object: {}, date: 1 },
    { id: '10293', object: {}, date: 1 },
    { id: '48576', object: {}, date: 1 }
]

function addSingle(obj, arr) {
    return arr.indexOf({id: '12345'})
}

console.log(addSingle({id: '12345'}, arr))