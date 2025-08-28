exports.searchFlights = async (req, res, next) => {
  try {
    res.json("ciaooo");
  } catch (err) {
    next(err); // passa all’error handler
  }
};