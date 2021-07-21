const crypto = require('crypto');
const fs = require('fs');

/**
 *
 * @param {*} filename
 * @param {*} algorithm
 * https://gist.github.com/GuillermoPena/9233069
 */
module.exports = fileHash = (filename, algorithm = 'md5') => {
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
