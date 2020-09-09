const checkAdmin = () => async (req, res, next) => {
  if (res.locals.member.role === 'admin') {
    return next()
  }
  res.status(401).json({ message: `You don't have permission to access` })
  return false
}
module.exports = checkAdmin()
