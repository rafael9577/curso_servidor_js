import express from 'express';
import routs from './src/routs/postRouts.js';

const app = express()
routs(app)

app.listen(3000, () => {
    console.log('Inicio');
});
