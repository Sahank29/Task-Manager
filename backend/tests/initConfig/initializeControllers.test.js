const InitConfig = require('../../app');
const authRoutes = require('../../routes/authRoutes');
require('../setupTests');

// Mock express
jest.mock('express', () => {
    const mockRouter = {
        post: jest.fn(),
    };

    const expressMock = () => ({
        use: jest.fn(),
        listen: jest.fn(),
    });

    expressMock.Router = jest.fn(() => mockRouter);
    expressMock.json = jest.fn(); 

    return expressMock;
});

jest.mock('../../routes/authRoutes');

describe('InitConfig - Controller Initialization', () => {
    let appMock, useMock;

    beforeEach(() => {
        const initConfig = new InitConfig();
        initConfig.initializeAll();
        appMock = initConfig.getApp();
        useMock = appMock.use;
    });

    it('should initialize controllers', () => {
        expect(useMock).toHaveBeenCalledWith('/cred', authRoutes);
    });
});
