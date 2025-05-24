const bcrypt = require('bcrypt')

exports.verifyPassword = async (passwordPlainText, passwordHash) => {
    return await bcrypt.compare(passwordPlainText, passwordHash)
}

exports.hashPassword = async (pass, saltRounds) => {
    const hash = await bcrypt.hash(pass, saltRounds);

    return hash
}