import express from "express";
import { home, about, contactForm, notFound, loginForm, registerForm, updateForm, admin, registerUser,
    login, update, deleteUser, setStatus } from "../controller/controller.js";
const router = express.Router();

router.get('/', home);

router.get('/about', about);

router.get('/contact', contactForm);

router.get('/404', notFound);

router.get('/login', loginForm);

router.get('/register', registerForm);

router.get('/update', updateForm);

router.get('/admin', admin);

router.post('/register', registerUser);

router.post('/login', login);

router.put('/update/:id', update);

router.delete('/delete/:id', deleteUser);

router.put('/skater/status/:id', setStatus);

export default router;
