import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import Author from "../models/author";

describe('GET /authors endpoint', () => {
    const authors = [
        { first_name: 'Jane', family_name: 'Austen', date_of_birth: new Date('1775-12-16'), date_of_death: new Date('1817-07-18') },
        { first_name: 'Ernest', family_name: 'Hemingway', date_of_birth: new Date('1899-07-21'), date_of_death: new Date('1961-07-02') },
        { first_name: 'John', family_name: 'Doe', date_of_birth: new Date('1990-01-01'), date_of_death: new Date('2020-01-01') }
    ];

    beforeAll(() => {
        Author.getAllAuthors = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('should return a list of authors sorted by family name', async () => {
        const expectedAuthors = authors.map(author => {
            const a = new Author(author);
            return `${a.name} : ${a.lifespan}`;
        });
        
        (Author.getAllAuthors as jest.Mock).mockResolvedValueOnce(expectedAuthors);
        
        const response = await request(app).get('/authors');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedAuthors);
        expect(Author.getAllAuthors).toHaveBeenCalledWith({ family_name: 1 });
    });

    test('should return "No authors found" when there are no authors', async () => {
        (Author.getAllAuthors as jest.Mock).mockResolvedValueOnce([]);
        
        const response = await request(app).get('/authors');
        
        expect(response.status).toBe(200);
        expect(response.text).toBe('No authors found');
    });

    test('should return "No authors found" when an error occurs', async () => {
        (Author.getAllAuthors as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        
        const response = await request(app).get('/authors');
        
        expect(response.status).toBe(200);
        expect(response.text).toBe('No authors found');
    });
});
