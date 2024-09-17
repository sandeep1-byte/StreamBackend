import request from 'supertest';
import mongoose from 'mongoose';
import app, { closeServer, startServer } from './src/User'; // Ensure correct paths

// Mock Product model methods
jest.mock('./src/Model/product.model');

describe('Product API', () => {
    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test');

        // Start the server
        await startServer();
    });

    afterAll(async () => {
        // Close the server
        await closeServer();

        // Disconnect from the database
        await mongoose.disconnect();
    });

    // Test for 404 response for unknown endpoint
    it('should respond with 404 for unknown endpoint', async () => {
        const response = await request(app).get('/unknown-endpoint');
        expect(response.status).toBe(404);
    });

    // Add your existing tests here
});
