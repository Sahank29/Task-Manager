// __tests__/validators.test.js

const { emailValidator, passwordValidator } = require('../utils/validators');
require('./setupTests'); // Import common setup if needed

describe('Email Validator', () => {
    it('should return true for valid emails', () => {
        expect(emailValidator('test@example.com')).toBe(true);
        expect(emailValidator('user@domain.io')).toBe(true);
    });

    it('should return false for invalid emails', () => {
        expect(emailValidator('invalid-email')).toBe(false);
        expect(emailValidator('user@com')).toBe(false);
    });
});

describe('Password Validator', () => {
    it('should return true for valid passwords', () => {
        expect(passwordValidator('Test1234!')).toBe(true);
    });

    it('should return false for invalid passwords', () => {
        expect(passwordValidator('short')).toBe(false);
        expect(passwordValidator('nouppercase1')).toBe(false);
    });
});
