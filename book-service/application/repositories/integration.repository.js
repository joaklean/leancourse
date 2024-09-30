const IntegrationModel = require('../models/mongo/integration.model.js'); 
class IntegrationRepository {
    async getById(id) {
        return await IntegrationModel.findById(id);
    }
}

module.exports = IntegrationRepository;