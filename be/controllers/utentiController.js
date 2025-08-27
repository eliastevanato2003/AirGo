exports.searchFlights = async (req, res, next) => {
  try {
    res.json("ciao");
  } catch (err) {
    next(err); // passa all’error handler
  }
};