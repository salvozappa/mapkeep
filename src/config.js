const config = {
    development: {
        tileserverUrl: 'http://localhost:3000/',
        nominatimUrl: 'http://localhost:8081',
        mapStyle: 'style.development.json'
    },
    production: {
        tileserverUrl: 'https://tileserver.mapkeep.com/',
        nominatimUrl: 'http://nominatim.mapkeep.com/',
        mapStyle: 'style.json'
    },
}

module.exports = (process.env.NODE_ENV === 'production') ? config.production : config.development;
