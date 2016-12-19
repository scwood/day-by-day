function checkForParams(required) {
  return function _checkForParams(req, res, next) {
    const missing = required.filter(param => {
      if (!req.body[param]) {
        return true;
      }
      return false;
    });
    if (missing.length === 0) {
      next();
    } else if (missing.length === 1) {
      res.status(400).send({ error: `Missing required value: ${missing[0]}` });
    } else {
      const missingString = missing.join(', ');
      res.status(400).send({
        error: `Missing required values: ${missingString}`
      });
    }
  };
}

export default checkForParams;
