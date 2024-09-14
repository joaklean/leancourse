const axios = require('axios');
const IAuthorRepository = require('../../domain/interfaces/authorRepository.interface');

class AxiosAuthorRepository extends IAuthorRepository {
    constructor() {
        super();
        this.authorServiceUrl = process.env.AUTHOR_SERVICE_URL || 'http://author-service:3000';
    }

    async getAll() {
        try {
            const response = await axios.get(`${this.authorServiceUrl}/api/authors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching authors:', error);
            throw new Error('Failed to fetch authors from author service');
        }
    }

    async create(author) {
        try {
            const response = await axios.post(`${this.authorServiceUrl}/api/authors`, author);
            return response.data;
        } catch (error) {
            console.error('Error creating author:', error);
            throw new Error('Failed to create author in author service');
        }
    }

    async getById(id) {
        try {
            const response = await axios.get(`${this.authorServiceUrl}/api/authors/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching author with id ${id}:`, error);
            throw new Error(`Failed to fetch author with id ${id} from author service`);
        }
    }

    async update(id, author) {
        try {
            const response = await axios.put(`${this.authorServiceUrl}/api/authors/${id}`, author);
            return response.data;
        } catch (error) {
            console.error(`Error updating author with id ${id}:`, error);
            throw new Error(`Failed to update author with id ${id} in author service`);
        }
    }

    async delete(id) {
        try {
            const response = await axios.delete(`${this.authorServiceUrl}/api/authors/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting author with id ${id}:`, error);
            throw new Error(`Failed to delete author with id ${id} in author service`);
        }
    }
}

module.exports = AxiosAuthorRepository;