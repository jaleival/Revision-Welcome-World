import express from 'express';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

router.get('/crear', (req, res) => {
try {
    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    const { file, content } = req.query;
    fs.writeFile(`uploads/${file}`, `${dia < 10 ? '0'+dia : dia}/${mes < 10 ? '0'+mes : mes}/${anio} - ${content}`, 'utf-8')
    res.send(`Archivo ${file} creado satisfactoriamente`);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/leer', (req, res) => {
    const { archivo } = req.query;
    fs.readFile(`uploads/${archivo}`, 'utf-8')
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    })
});

router.get('/renombrar', async (req, res) => {
    const { nombre, nuevoNombre } = req.query;
    try {
        await fs.rename(`uploads/${nombre}`, `uploads/${nuevoNombre}`);
        res.send(`Archivo ${nombre} renombrado satisfactoriamente por ${nuevoNombre}`);
    } catch (error) {
        res.status(500).send("El archivo que consultas no existe");
    }
});

router.get('/eliminar', async (req, res) => {
    const { archivo } = req.query;
    try {
        await fs.unlink(`uploads/${archivo}`);
        res.send(`Archivo ${archivo} eliminado satisfactoriamente`);
    } catch (error) {
        res.status(500).send("El archivo que consultas no existe");
    }
});

export default router;