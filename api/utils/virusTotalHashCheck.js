const path = require('path');
const axios = require('axios').default;

const fileHash = require('../utils/fileHash');

module.exports = async (app) => {
  try {
    const hash = await fileHash(path.join(__dirname, '..', app.path));
    const virusTotalKey =
      'dd76d04e1ce3cc99daa7507de33d6a0bbb546abdbf255dbe8d7e6d53e07e77ca';
    const virusTotalResponse = await axios.get(
      'https://www.virustotal.com/vtapi/v2/file/report',
      {
        params: {
          apikey: virusTotalKey,
          resource: hash,
        },
      }
    );
    return virusTotalResponse.data;
  } catch (error) {
    next({
      message: 'Hashing computing failed',
      error: error,
    });
  }
};
