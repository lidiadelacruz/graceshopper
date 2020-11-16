const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
  next()
}

const adminOrByUserId = (req, res, next) => {
  // This logic should be double checked.
  if (req.user && (req.user.isAdmin || req.params.id === req.user.id)) {
    next()
  } else {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
}

module.exports = {adminsOnly, adminOrByUserId}
