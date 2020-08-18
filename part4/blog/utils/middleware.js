const getTokenFrom = (request, response, next) => {
  const authorization = request.get("Authorization");
  request.token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  }
  next()
};

module.exports = {getTokenFrom}