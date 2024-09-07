// __tests__/initConfig/initializeDatabase.test.js

const InitConfig = require('../../app');
const connectDB = require('../../config/dbConnection');
require('../setupTests');

jest.mock('../../config/dbConnection');

describe('InitConfig - Database Initialization', () => {
    it('should initialize the database', () => {
        const initConfig = new InitConfig();
        initConfig.initializeDatabase();

        // Ensure that the connectDB function is called
        expect(connectDB).toHaveBeenCalled();
    });
});
