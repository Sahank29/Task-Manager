const express = require('express');
const connectDB = require('./config/dbConnection');

class InitConfig {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 2024;
        this.server = null;
    }

    initializeAll() {
        this.initializePort();
        this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeControllers();
    }

    initializePort() {
        this.server = this.app.listen(this.port, () => {
            console.log("App running on Port", this.port);
        });
    }

    initializeDatabase() {
        connectDB();
    }

    initializeMiddleware() {
        this.app.use(express.json());
    }

    initializeControllers() {
        this.app.use("/cred", require('./routes/authRoutes'));
    }

    getApp() {
        return this.app;
    }

    getPort() { 
        return this.port;
    }

    async closeServer() {
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server.close((err) => {
                    if (err) return reject(err);
                    console.log("Server closed.");
                    resolve();
                });
            });
        }
    }
}

module.exports = InitConfig;
