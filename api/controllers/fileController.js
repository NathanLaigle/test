const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const hash = await fileHash(
      path.join(__dirname, '..', 'uploads', req.params.name)
    );
    const virusTotalResponse = await fetch(
      'https://www.virustotal.com/vtapi/v2/file/scan/d76d04e1ce3cc99daa7507de33d6a0bbb546abdbf255dbe8d7e6d53e07e77ca',
      {
        method: 'POST',
        body: {
          file: hash,
        },
      }
    );
    res.json(virusTotalResponse);
  } catch (error) {
    next({
      message: 'Hashing computing failed',
      error: error,
    });
  }
};

/**
 *
 * @param {*} filename
 * @param {*} algorithm
 * https://gist.github.com/GuillermoPena/9233069
 */
const fileHash = (filename, algorithm = 'md5') => {
  return new Promise((resolve, reject) => {
    // Algorithm depends on availability of OpenSSL on platform
    // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
    let shasum = crypto.createHash(algorithm);
    try {
      let s = fs.ReadStream(filename);
      s.on('data', function (data) {
        shasum.update(data);
      });
      // making digest
      s.on('end', function () {
        const hash = shasum.digest('hex');
        return resolve(hash);
      });
    } catch (error) {
      return reject('calc fail');
    }
  });
};
