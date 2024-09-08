// jest.config.js

module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setupTests.js'], // Automatically load test setup
    testPathIgnorePatterns: ['/node_modules/'], // Ignore test paths
};
