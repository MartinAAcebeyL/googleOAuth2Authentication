require('dotenv').config()
const http = require('http');
const app = require('./src/app');
const config = require('./src/configs/config');
const logger = require('./src/configs/logger');

const server = http.createServer(app);
const PORT = config.PORT || 3001;

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
});