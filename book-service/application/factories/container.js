// container.js
const { createContainer, asClass, asFunction } = require('awilix');
const IntegrationRepository = require('./application/repositories/integration.repository');
const MongoBookRepository = require('./application/repositories/mongo-book.repository');
const AxiosAuthorRepository = require('./application/repositories/axios-author.repository');
const BookUseCase = require('./domain/usecases/book.usecase');
const AuthorUseCase = require('./domain/usecases/author.usecase');
const IntegrationFactory = require('./application/middlewares/integratonFactory');

const container = createContainer();

container.register({
    integrationRepository: asClass(IntegrationRepository).singleton(),
    mongoBookRepository: asClass(MongoBookRepository).singleton(),
    axiosAuthorRepository: asFunction(async () => {
        const integration = await IntegrationFactory('AXIOS_AUTH_INTEGRATION');
        return new AxiosAuthorRepository(integration);
    }).singleton(),
    bookUseCase: asClass(BookUseCase).singleton(),
    authorUseCase: asClass(AuthorUseCase).singleton(),
});

module.exports = container;

