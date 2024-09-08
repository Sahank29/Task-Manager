const express = require('express');
const InitConfig = require('../../app');
require('../setupTests');

jest.mock('express');

describe('InitConfig - Middleware Initialization', () => {
    let appMock, useMock;

    beforeEach(() => {
        appMock = { use: jest.fn() };
        useMock = appMock.use;

        express.mockReturnValue(appMock);
    });

    it('should initialize middleware', () => {
        const initConfig = new InitConfig();
        initConfig.initializeMiddleware();

        expect(useMock).toHaveBeenCalledWith(express.json());
    });
});
