const axios = require('axios')
const bookMicroserviceUrl = process.env.BOOK_URL

const api = {
    async updateAuthorInBook(author){
        try{
            await axios.post(`${bookMicroserviceUrl}/api/books/updatedAuthor`, author)
        }catch (e) {
            console.error("Error updating author in book: ", e)
        }
    }
}

module.exports = api