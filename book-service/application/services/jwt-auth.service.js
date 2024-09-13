const jwt = require('jsonwebtoken');
const AuthServiceInterface = require('../../domain/interfaces/authService.interface');

class JwtAuthService extends AuthServiceInterface {
    constructor(secret, expiresIn = '1h') {
        super();
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
}

module.exports = JwtAuthService;