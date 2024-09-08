const InitConfig = require('../../app');
const connectDB = require('../../config/dbConnection');
require('../setupTests');

jest.mock('../../config/dbConnection');

describe('InitConfig - Database Initialization', () => {
    it('should initialize the database', () => {
        const initConfig = new InitConfig();
        initConfig.initializeDatabase();

        expect(connectDB).toHaveBeenCalled();
    });
});
