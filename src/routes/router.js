const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware')
const { hashPassword, verifyPassword } = require('../services/verifyPassword')

router.post('/user', async (req, res) => {
    try {
        const { name, email, password } = req.body

        var pass = await hashPassword(password, 10)

        const user = await User.create({
            name: name,
            password: pass,
            email: email
        })

        res.status(200).send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Erro ao cadastrar usuario' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body



        const user = await User.findOne({ where: { email: email } })
        if (!user){
            return res.status(404).send('usuario não encontrado')
        }
        const isValid = await verifyPassword(password, user.password)
        if (!isValid ) {
            return res.status(401).send('usuario invalido')
        }

        var payload = { userId: user.id, role: 'normal' }
        var secretKey = process.env.TOKEN_ACESS;  
        var token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        const response = {
            acess_token: token,
        }

        res.status(200).json(response)

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: "Erro ao buscar usuario" })
    }
})

router.get('/home', authMiddleware, (req,res) => {
    res.status(200).json({message:'Usuário autenticado !'})
})

module.exports = router 