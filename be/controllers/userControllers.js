exports.prova = async (req, res, next) => {
  try {
    res.json("Prova");
  } catch (err) {
    next(err); 
  }
};