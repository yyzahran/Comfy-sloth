// You can view the function at
// http://localhost:8888/.netlify/functions/hello

const items = [
    {
        id: 1,
        name: 'Adam'
    },
    {
        id: 2,
        name: 'Eve'
    }
]

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        // body: 'Hello world!',
        body: JSON.stringify(items)
    }
}
