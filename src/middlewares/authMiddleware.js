const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const secretKey = process.env.TOKEN_ACESS
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;  // Guarda os dados do token para uso na rota
        next();  // Continua a requisição
    } catch (err) {
        console.log(err.message)
        return res.status(403).json({ message: 'Token inválido ou expirado' })
    }
}

module.exports = authMiddleware