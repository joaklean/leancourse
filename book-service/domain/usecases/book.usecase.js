const authorCreationQueue = require('../../application/queues/authorCreationQueue');

class BookUseCase {
    constructor(bookRepository, authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    async createBook(data) {
        try {
            let author = data.author.id ? await this.authorRepository.getById(data.author.id) : null;
            const bookData = { ...data, author: author?._id || null };
            const newBook = await this.bookRepository.create(bookData);
            if (!author) {
                await authorCreationQueue.add('createAuthor', { author: data.author, bookId: newBook._id });
            }
            return newBook;
        } catch (error) {
            console.error('Error creating book:', error);
            throw new Error('Failed to create book');
        }
    }

    async getAllBooks() {
        try {
            const books = await this.bookRepository.getAll();
            return await Promise.all(books.map(async (book) => {
                const author = await this.authorRepository.getById(book.author);
                return { ...book.toObject(), author };
            }));
        } catch (error) {
            console.error('Error fetching all books:', error);
            throw new Error('Failed to fetch all books');
        }
    }

    async getBookById(id) {
        try {
            const book = await this.bookRepository.getById(id);
            if (!book) return null;
            const author = await this.authorRepository.getById(book.author);
            return { ...book.toObject(), author };
        } catch (error) {
            console.error(`Error fetching book with id ${id}:`, error);
            throw new Error(`Failed to fetch book with id ${id}`);
        }
    }

    async updateBook(id, data) {
        try {
            if (data.author) {
                let author = await this.authorRepository.getById(data.author);
                if (!author) {
                    author = await this.authorRepository.create(data.author);
                }
                data.author = author._id;
            }
            return await this.bookRepository.update(id, data);
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw new Error(`Failed to update book with id ${id}`);
        }
    }

    async deleteBook(id) {
        return await this.bookRepository.delete(id);
    }
}

module.exports = BookUseCase;
