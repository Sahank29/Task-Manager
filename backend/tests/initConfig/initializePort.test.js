const express = require('express');
const InitConfig = require('../../app');
require('../setupTests');

jest.mock('express');

describe('InitConfig - Port Initialization', () => {
    let appMock, listenMock;

    beforeEach(() => {
        appMock = { listen: jest.fn() };
        listenMock = appMock.listen;

        express.mockReturnValue(appMock);
    });

    it('should initialize the server and listen on the correct port', () => {
        const initConfig = new InitConfig();
        initConfig.initializePort();

        expect(listenMock).toHaveBeenCalledWith(
            process.env.PORT || 2024,
            expect.any(Function)
        );

        const logSpy = jest.spyOn(console, 'log');
        listenMock.mock.calls[0][1]();
        expect(logSpy).toHaveBeenCalledWith("App running on Port", process.env.PORT || 2024);
    });
});
