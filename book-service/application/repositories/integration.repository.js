const IntegrationModel = require('../models/mongo/integration.model.js'); 
class IntegrationRepository {
    async getById(id) {
        return await IntegrationModel.findById(id);
    }

    async getByName(name) {
        return await IntegrationModel.findOne({ name: name });
    }
}

module.exports = IntegrationRepository;