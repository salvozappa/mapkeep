const config = {
    development: {
        tileserverUrl: 'http://localhost:3000/',
        nominatimUrl: 'https://nominatim.openstreetmap.org/',
        mapStyle: 'style.development.json'
    },
    production: {
        tileserverUrl: 'https://tileserver.mapkeep.com/',
        nominatimUrl: 'https://nominatim.openstreetmap.org/',
        mapStyle: 'style.json'
    },
}

module.exports = (process.env.NODE_ENV === 'production') ? config.production : config.development;
