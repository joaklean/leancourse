const { Queue } = require('bullmq');
const connection = {
    host: 'localhost', 
    port: 6379,
};

const authorCreationQueue = new Queue('authorCreationQueue', { connection });

module.exports = authorCreationQueue;