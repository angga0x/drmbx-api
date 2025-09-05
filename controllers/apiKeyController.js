const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');
const { getGmtPlus7Time } = require('../utils/time');

const getApiKey = (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Username is required.'
        });
    }

    db.get('SELECT * FROM api_keys WHERE telegram_username = ?', [username], (err, row) => {
        if (err) {
            console.error('Database error in getApiKey', err.message);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error'
            });
        }
        if (row) {
            res.status(200).json({
                statusCode: 200,
                message: 'API key found.',
                apiKey: row.api_key
            });
        } else {
            const newApiKey = uuidv4();
            const now = getGmtPlus7Time();
            db.run('INSERT INTO api_keys (telegram_username, api_key, created_at, updated_at) VALUES (?, ?, ?, ?)', [username, newApiKey, now, now], function(err) {
                if (err) {
                    console.error('Database error in getApiKey insert', err.message);
                    return res.status(500).json({
                        statusCode: 500,
                        message: 'Internal Server Error'
                    });
                }
                res.status(201).json({
                    statusCode: 201,
                    message: 'API key generated successfully.',
                    apiKey: newApiKey
                });
            });
        }
    });
};

const regenerateApiKey = (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Username is required.'
        });
    }

    const newApiKey = uuidv4();
    const now = getGmtPlus7Time();
    db.run('UPDATE api_keys SET api_key = ?, updated_at = ? WHERE telegram_username = ?', [newApiKey, now, username], function(err) {
        if (err) {
            console.error('Database error in regenerateApiKey', err.message);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error'
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found.'
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: 'API key regenerated successfully.',
            apiKey: newApiKey
        });
    });
};

const viewApiKey = (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Username is required.'
        });
    }

    db.get('SELECT * FROM api_keys WHERE telegram_username = ?', [username], (err, row) => {
        if (err) {
            console.error('Database error in viewApiKey', err.message);
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error'
            });
        }
        if (row) {
            res.status(200).json({
                statusCode: 200,
                message: 'API key details found.',
                data: row
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'User not found.'
            });
        }
    });
};

module.exports = {
    getApiKey,
    regenerateApiKey,
    viewApiKey
};
