import { register, findOneByEmail, getUsers, updateUser, deleteUser, setStatus } from '../models/queries.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { check, validationResult } from 'express-validator';
import 'dotenv/config';

export const home = async (req, res) => {
    res.render('home', {
        title: 'Home',
        users: await models.getUsers(),
    });
};
export const about = (req, res) => {
    res.render('about', {
        title: 'About',
    });
};
export const contactForm = (req, res) => {
    res.render('contact', {
        title: 'Contact',
    });
};
export const notFound = (req, res) => {
    res.render('404', {
        title: '404',
    });
};
export const loginForm = (req, res) => {
    res.render('login', {
        title: 'Login',
    });
};
export const registerForm = (req, res) => {
    res.render('register', {
        title: 'Register Page',
    });
};
export const updateForm = async (req, res) => {
    res.render('update', {
        title: 'Update Page',
    });
};
export const admin = async (req, res) => {
    res.render('admin', {
        title: 'Admin Page',
        users: await models.getUsers(),
    });
};
export const register = async (req, res) => {
    const {
        name,
        email,
        experience,
        especialty,
        password,
        confirm_password,
    } = req.body;
    try {
        await check('name')
            .notEmpty()
            .withMessage('Debes ingresar un nombre')
            .run(req);
        await check('email')
            .notEmpty()
            .withMessage('Debes ingresar un email')
            .run(req);
        await check('experience')
            .notEmpty()
            .withMessage('Debes ingresar tu experiencia')
            .run(req);
        await check('especialty')
            .notEmpty()
            .withMessage('Debes ingresar tu especialidad')
            .run(req);
        await check('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres')
            .run(req);
        await check('confirm_password')
            .equals(password)
            .withMessage('Contraseña incorrecta')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', {
                title: 'Register Page',
                errors: errors.array(),
                old: req.body,
            });
        };

        //subir imagen
        const { image } = req.files;
        const imageName = uuidv4().slice(0, 8);

        const imageUrl = `/uploads/${imageName}.png`;
        image.mv(`./public/uploads/${imageName}.png`);

        //comprobar si el usuario existe
        const user = await models.findOneByEmail(email);
        if (user) {
            return res.render('register', {
                title: 'Register Page',
                errors: [{ msg: 'Ya hay un usuario con este correo' }],
                old: req.body,
            });
        };

        //hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);


        const response = await models.register({
            name,
            email,
            experience,
            especialty,
            password: hashedPassword,
            image: imageUrl,
        });

        res.status(201).redirect('/login');
    } catch (error) {
        res.status(500).send(error.message);
    };
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await check('email')
            .notEmpty()
            .withMessage('Debes ingresar un email')
            .run(req);
        await check('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', {
                title: 'Login Page',
                errors: errors.array(),
                old: req.body,
            });
        };

        const user = await models.findOneByEmail(email);
        if (!user) {
            return res.render('login', {
                title: 'Login Page',
                errors: [{ msg: 'No hay un usuario con este correo' }],
                old: req.body,
            });
        };

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.render('login', {
                title: 'Login Page',
                errors: [{ msg: 'Contraseña incorrecta' }],
                old: req.body,
            });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '2m',
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 40000,
        });
        res.status(200).render('update', {
            title: 'Update Page',
            user
        });
    } catch (error) {
        res.status(500).send(error.message);
    };
};
export const update = async (req, res) => {
    let { name, experience, especialty, password } = req.body;
    const { id } = req.params;
    console.log(id)

    let hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    try {
        await models.updateUser(name, experience, especialty, password, id);
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    };
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await models.deleteUser(id);
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export const setStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await models.setStatus(id, status);
        res.status(200).redirect('/admin');
    } catch (error) {
        res.status(500).send(error.message);
    };
};