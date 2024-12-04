const app = require("./app");
const config = require("./config");
const logger = require("./utils/logger");

logger.info("Server started successfully");
logger.error("Database connection failed");

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
