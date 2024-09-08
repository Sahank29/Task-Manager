const request = require('supertest');
const InitConfig = require('../app');
require('./setupTests');

let app;
let initConfig;

beforeAll(() => {
    initConfig = new InitConfig();
    initConfig.initializeAll();
    app = initConfig.getApp();
});

afterAll(async () => {
    await initConfig.closeServer();
});

describe('POST /api/cred/register', () => {
    it('should return 102 when password is invalid', async () => {
        const res = await request(app)
            .post('/api/cred/register')
            .send({ email: 'wronguser@example.com', password: 'wrongpass' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(102);
    });

    it('should return 102 when email is invalid', async () => {
        const res = await request(app)
            .post('/api/cred/register')
            .send({ email: 'wronguser@.com', password: 'Wrong1assword' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(102);
    });

    it('should return 103 for User already exists', async () => {
        const res = await request(app)
            .post('/api/cred/register')
            .send({ email: 'wronguser@example.com', password: 'Wrong1assword' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(103);
    });

    it('should return 104 on successful Sign Up', async () => {
        const user = {
            email: 'sahank29@gmail.com',
            password: '@LetsMockTest1',
        };

        const res = await request(app)
            .post('/api/cred/register')
            .send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(104);
    });
});

describe('POST /api/cred/login', () => {
    it('should return 107 when email or password is missing', async () => {
        const res = await request(app)
            .post('/api/cred/login')
            .send({ email: 'test@example.com' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(107);
    });

    it('should return 106 with a valid token on successful login', async () => {
        const user = {
            email: 'sahank29@gmail.com',
            password: '@LetsMockTest1',
        };

        const res = await request(app)
            .post('/api/cred/login')
            .send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(106);
        expect(res.body).toHaveProperty('cred');
    });

    it('should return 105 for invalid credentials', async () => {
        const res = await request(app)
            .post('/api/cred/login')
            .send({ email: 'sahank29@gmail.com', password: 'Wrong1assword' });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(105);
    });
});