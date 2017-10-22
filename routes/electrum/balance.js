module.exports = (shepherd) => {
  shepherd.get('/getbalance', (req, res, next) => {
    const ecl = new shepherd.electrumJSCore(req.query.port, req.query.ip, 'tcp');

    ecl.connect();
    ecl.blockchainAddressGetBalance(req.query.address)
    .then((json) => {
      if (json &&
          json.hasOwnProperty('confirmed') &&
          json.hasOwnProperty('unconfirmed')) {
        ecl.close();

        const successObj = {
          msg: 'success',
          result: json,
        };

        res.end(JSON.stringify(successObj));
      } else {
        ecl.close();

        const successObj = {
          msg: 'error',
          result: json,
        };

        res.end(JSON.stringify(successObj));
      }
    });
  });

  return shepherd;
};