import express from 'express';
import routes from './routes/router.js';
import cookieParser from 'cookie-parser';
import expressFileUpload from 'express-fileupload';
import { engine } from 'express-handlebars';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//motor de plantilla
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressFileUpload({
        limits: { fileSize: 1000000 },
        abortOnLimit: true,
        responseOnLimit: 'El archivo pesa demasiado',
    })
);

//routes
app.use('/', routes);

app.listen(PORT, console.log(`🔥Server running on port ${PORT}🔥`));