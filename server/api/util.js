const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const error = new Error('This page is only viewable by admin users.')
    error.status = 401
    return next(error)
  }
  next()
}

const adminOrByUserId = (req, res, next) => {
  if (
    req.user &&
    (req.user.isAdmin ||
      req.user.id === (req.params.id || req.body.id || req.body.user.id))
  ) {
    next()
  } else {
    const error = new Error('This page is only viewable by approved users.')
    error.status = 401
    return next(error)
  }
}

module.exports = {adminsOnly, adminOrByUserId}
