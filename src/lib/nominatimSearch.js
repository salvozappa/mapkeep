const { nominatimUrl } = require('../config');

const axios = require('axios');

const nominatimSearch = async (query, bounds) => {
    const url = encodeURI(`${nominatimUrl}/search/${query}`);
    const response = await axios.get(url, {
        params: {
            viewbox: `${bounds._sw.lng},${bounds._ne.lng},${bounds._sw.lat},${bounds._ne.lat}`,
            bounded: 1,
            format: 'json'
        }
    });
    return response;
};

export default nominatimSearch;
