const express = require('express');

const connectDB = require('./config/dbConnection');

class InitConfig {
    constructor() {
        const app = express();
        const port = process.env.PORT || 2024;

        this.initializePort(app, port);
        this.initializeDatabase();
        this.initializeMidddleware(app);
        this.initializeControllers(app);
    }

    initializePort(app, port) {
        app.listen(port, () => console.log("App running on Port", port));
    }

    initializeDatabase() {
        connectDB();
    }

    initializeMidddleware(app) {
        app.use(express.json());
    }

    initializeControllers(app) {
        app.use("/", (req, res) => {
            res.send("Hello from Task Manger");
        })
    }
}

module.exports = InitConfig;