const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// An api endpoint that returns a short list of items
app.get('/api', (req,res) => {
    let title = req.query.title;
    request('http://jsonplaceholder.typicode.com/posts', function(error, response, body) {
        console.log("response: "+ response);
        console.log("body: ");
        
        var data = JSON.parse(body)
        var data1 = []
        //console.log(data.type)
        for(var val of data) {
            if (val.title.includes(title)) data1.push(val)
        }

        console.log(data1.length)

        res.send(data1);
    });
    //console.log(title);
    //console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    console.log("any")
});

const port = process.env.PORT || 6000;
app.listen(port);

console.log('App is listening on port ' + port);