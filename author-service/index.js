const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const AuthorUseCase = require('./domain/usecases/author.usecase');
const MongoAuthorRepository = require('./application/repositories/mongo-author.repository');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'author.proto'), {});
const authorProto = grpc.loadPackageDefinition(packageDefinition).author;

const authorRepository = new MongoAuthorRepository();
const authorUseCase = new AuthorUseCase(authorRepository);

const getAuthorById = async (call, callback) => {
    try {
        const author = await authorUseCase.getAuthorById(call.request.id);
        callback(null, { author });
    } catch (error) {
        callback(error);
    }
};

const createAuthor = async (call, callback) => {
    try {
        const author = await authorUseCase.createAuthor(call.request);
        callback(null, { author });
    } catch (error) {
        callback(error);
    }
};

const server = new grpc.Server();
server.addService(authorProto.AuthorService.service, { getAuthorById, createAuthor });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server running on port 50051');
});