class AuthServiceInterface {
    generateToken(payload) {
        throw new Error('generateToken method must be implemented');
    }

    verifyToken(token) {
        throw new Error('verifyToken method must be implemented');
    }
}

module.exports = AuthServiceInterface;