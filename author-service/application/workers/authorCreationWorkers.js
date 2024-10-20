const { Worker } = require('bullmq');
const connection = {
    host: 'localhost',
    port: 6379,
};
const AuthorUseCase = require('../domain/usecases/author.usecase');
const MongoAuthorRepository = require('../application/repositories/mongo-author.repository');

const authorRepository = new MongoAuthorRepository();
const authorUseCase = new AuthorUseCase(authorRepository);

const authorCreationWorker = new Worker('authorCreationQueue', async job => {
    const { author, bookId } = job.data;
    console.log(`Received job to create author:`, author);
    
    const createdAuthor = await authorUseCase.createAuthor(author);
    
    await notifyBookService(createdAuthor, bookId);
}, { connection });

authorCreationWorker.on('completed', job => {
    console.log(`Job completed: ${job.id}`);
});

authorCreationWorker.on('failed', (job, err) => {
    console.error(`Job failed: ${job.id} with error: ${err.message}`);
});

async function notifyBookService(author, bookId) {
    const bookMicroserviceUrl = process.env.BOOK_URL;
    try {
        await axios.post(`${bookMicroserviceUrl}/api/books/updatedAuthor`, { authorId: author._id, bookId });
    } catch (error) {
        console.error("Error notifying book service about author creation:", error);
    }
}