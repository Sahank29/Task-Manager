// __tests__/setupTests.js

const mongoose = require('mongoose');

// Mock environment variables for tests
beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = 'ufgauidq2k0e12p89ryur12ieo2o01ied09u12edi120eid012ued0uj12euj12dadaqu3823y84ru239urw9vwm3upru3w';
    process.env.CONNECTION_STRING = 'mongodb://localhost:27017/testdb';
});

// Clean up after all tests
afterAll(async () => {
    await mongoose.connection.close();
});
