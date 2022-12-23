'use strict'

const User = require('../models/user');

const validateRegister = require('../utilities/validateAll')

let controller = {
    new: (req, res) => {
        let { username, email, password } = req.body;

        if (validateRegister(username, email, password)) {
            return res.status(500).send({ status: 'error', message: 'Ocurrio un error, intente recargar la pagina' })
        }

        let user = new User();
        user.username = username;
        user.email = email;
        user.password = password;

        User.findOne({ username }, (error, usernameExist)=> {
            if (usernameExist) {
                return res.status(500).send({ status: 'error', message: 'El nombre de usuario ya existe' })
            } else {
                User.findOne({ email }, (error, emailExist)=> {
                    if (emailExist) {
                        return res.status(500).send({ status: 'error', message: 'Ese email ya esta en uso' })
                    } else {
                        user.save((err) => {
                            if (err) {
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'Ocurrio un error'
                                });
                            } else {
                                return res.status(200).send({
                                    status: 'success',
                                    username
                                });
                            }
                        }); 
                    }
                })
            }
        })
    },
    auth: (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email }, (error, user)=> {
            if (error) {
                return res.status(500).send({ status: 'error', message: 'Ocurrio un error' });
            } else if (!user) {
                return res.status(500).send({ status: 'error', message: 'La cuenta no existe' });
            }
            user.correctPassword(password, (err, result)=> {
                if (err) {
                    res.status(500).send({ status: 'error', message: 'Ocurrio un error' });
                } else if (result) {
                    res.status(200).send({
                        status: 'success',
                        email
                    });
                } else {
                    res.status(500).send({ status: 'error', message: 'Email o contraseña incorrectos' })
                }
            })
        })
    }
}

module.exports = controller;