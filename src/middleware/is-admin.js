module.exports = async function (req, res, next) {
  try {
    const isAdmin = req.user.role === "admin" ? true : false;
    if (!isAdmin) {
      return res.status(400).json({ message: "You are not authorized" });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: "Error from is-admin middleware" });
  }
};
