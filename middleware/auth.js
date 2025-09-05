const db = require('../db/database');
const { getGmtPlus7Time } = require('../utils/time');

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized: API key is missing.'
    });
  }

  db.get('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, row) => {
    if (err) {
      console.error('Database error in auth middleware', err.message);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
    if (!row) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden: Invalid API key.'
      });
    }
    
    // Update the last_used_at timestamp
    db.run('UPDATE api_keys SET last_used_at = ? WHERE api_key = ?', [getGmtPlus7Time(), apiKey]);
    
    req.user = row;
    next();
  });
};

module.exports = authMiddleware;
