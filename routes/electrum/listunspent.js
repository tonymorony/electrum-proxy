module.exports = (shepherd) => {
  shepherd.get('/listunspent', (req, res, next) => {
    if (shepherd.checkServerData(req.query.port, req.query.ip, res)) {
      const ecl = new shepherd.electrumJSCore(req.query.port, req.query.ip, req.query.proto || 'tcp');

      ecl.connect();
      ecl.blockchainAddressListunspent(req.query.address)
      .then((json) => {
        ecl.close();

        const successObj = {
          msg: json.code ? 'error' : 'success',
          result: json,
        };

        res.end(JSON.stringify(successObj));
      });
    }
  });

  return shepherd;
};