// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const deckRoutes = require('./routes/deck');
app.use('/api/deck', deckRoutes);


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/deck', deckRoutes);

app.get('/', (req, res) => {
  res.send('Clash Royale Deck Optimizer API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
