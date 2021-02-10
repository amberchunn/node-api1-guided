// from Node
const http = require('http');

const server = http.createServer((req, res) => {
    // communicate success response to browser
    res.statusCode = 200;

    console.log('new visitor');

    // tell browser to render response as HTML
    res.setHeader('Content-Type', 'text/html');

    // send the data
    res.write(`<h1>Hi. The current time is ${new Date()}.</h1>`);

    // we are finished, so send response
    res.end();
});

server.listen(8080, () => {
    console.log('Cookie Monster ate your server that was running on localhost:8080');
});
