const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../author.proto'), {});
const authorProto = grpc.loadPackageDefinition(packageDefinition).author;

class GrpcAuthorRepository {
    constructor() {
        this.client = new authorProto.AuthorService('author-service:50051', grpc.credentials.createInsecure());
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.client.getAuthorById({ id }, (error, response) => {
                if (error) {
                    return reject(error);
                }
                resolve(response.author);
            });
        });
    }

    create(author) {
        return new Promise((resolve, reject) => {
            this.client.createAuthor(author, (error, response) => {
                if (error) {
                    return reject(error);
                }
                resolve(response.author);
            });
        });
    }

    update(author) {
        return new Promise((resolve, reject) => {
            // Unimplemented function
            reject(new Error('UpdateAuthor not implemented'));
        });
    }

    delete(authorRequest) {
        return new Promise((resolve, reject) => {
            // Unimplemented function
            reject(new Error('DeleteAuthor not implemented'));
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            // Unimplemented function
            reject(new Error('DeleteAuthor not implemented'));
        });
    }
}

module.exports = GrpcAuthorRepository;