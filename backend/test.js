// test.js
require('dotenv').config();
const { getPlayerUnlockedCards } = require('./services/clashApi');

getPlayerUnlockedCards('#9V8UQYPJ').then(console.log).catch(console.error);