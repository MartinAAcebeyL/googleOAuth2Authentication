const bcrypt = require('bcrypt');
const saltRounds = 10; // El número de rondas de sal que bcrypt utilizará

function transformError(error) {
    const errors = {};
    for (const key in error.errors) {
        errors[key] = error.errors[key].message;
    }
    return { message: errors };
}

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al hashear la contraseña');
    }
}

module.exports = {
    transformError,
    hashPassword
}