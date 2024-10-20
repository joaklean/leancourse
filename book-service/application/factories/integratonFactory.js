const axios = require('axios');
const IntegrationRepository = require('../repositories/integration.repository');

async function IntegrationFactory(integrationName) {
    const integrationRepository = new IntegrationRepository();
    const integration = await integrationRepository.getByName(integrationName);

    if (!integration) {
        throw new Error(`Integration with name ${integrationName} not found`);
    }

    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            ...(integration.token ? { 'Authorization': `Bearer ${integration.token}` } : {})
        }
    });

    return new Proxy(axiosInstance, {
        get(target, prop) {
            if (prop === 'getName') {
                return integration.name;
            }
            if (prop === 'getId') {
                return integration.id;
            }
            if (prop === 'getApiKey') {
                return integration.token;
            }
            return target[prop];
        }
    });
}

module.exports = IntegrationFactory;
