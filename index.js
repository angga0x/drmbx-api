require('dotenv').config();
const express = require('express');
const db = require('./db/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const dramaRoutes = require('./routes/dramaRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');

app.use('/v1/drama', dramaRoutes);
app.use('/v1/keys', apiKeyRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'DramaBox API Server is running!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
