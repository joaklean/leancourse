const axios = require('axios')
const bookMicroserviceUrl = process.env.BOOK_URL

const api = {
    async updateAuthorInBook(id, author){
        try{
            await axios.put(`${bookMicroserviceUrl}/api/books/${id}/author`, author)
        }catch (e) {
            console.error("Error updating author in book: ", e)
        }
    }
}

module.exports = api