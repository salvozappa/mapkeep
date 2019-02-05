const express = require('express');
const app = express();
const MBTiles = require('@mapbox/mbtiles');
const path = require('path');

app.use('/fonts', express.static('fonts', {
    setHeaders: (response) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
    }
}))

const header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/x-protobuf',
    'Content-Encoding': 'gzip'
};

app.get('/:source/:z/:x/:y.pbf', (request, response) => {
    new MBTiles(path.join(__dirname, request.params.source + '.mbtiles'), (error, mbtiles) => {
        mbtiles.getTile(request.params.z, request.params.x, request.params.y, (error, tile) => {
            if (error) {
                response.set({ 'Content-Type': 'text/plain' });
                response.status(404).send('Tile rendering error: ' + error + '\n');
            } else {
                response.set(header);
                response.send(tile);
            }
        });
        if (error) {
            console.log('error opening database');
        }
    });
});

console.log('__dirname : ' + __dirname)
console.log('Listening on port: ' + 3000);
app.listen(3000);
