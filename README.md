Desafío Opcional Welcome World:
1.- npm init -y
1.1.- Configuración package.son
{
  "name": "revisionwelcomeworld",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node —watch index.js"
  },
  "keywords": [],
  "author": "Jorge Leiva",
  "license": "MIT",
  "dependencies": {
    "express": "^4.19.2"
  }
}

2.- npm i express
3.- Creamos carpetas routes, views, controllers y archivo .gitignore
4.- import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
// Escuchar el puerto
app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));
5.- Creamos las rutas
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});
export default router;
6.- import router from "./routes/router.js";
app.use("/", router);
7.- Cargamos el index.html en la carpeta views
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <title>Document</title>
  </head>
  <body>
    <div class="row w-75 m-auto">
      <!-- Crear -->
      <div class="col-12 col-sm-3 contaienr p-5">
        <h3>Crear un archivo</h3>
        <form action="/crear">
          <div class="form-group">
            Nombre del archivo
            <input name="archivo" class="form-control" />
          </div>
          <div class="form-group">
            Contenido
            <textarea
              name="contenido"
              class="form-control"
              id="contenido"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Crear archivo</button>
        </form>
      </div>
      <!-- Leer -->
      <div class="col-12 col-sm-3 contaienr p-5">
        <h3>Leer un archivo</h3>
        <form action="/leer">
          <div class="form-group">
            Nombre del archivo
            <input name="archivo" class="form-control"  />
          </div>

          <button type="submit" class="btn btn-info">Consultar archivo</button>
        </form>
      </div>
      <!-- Renombrar -->
      <div class="col-12 col-sm-3 contaienr p-5">
        <h3>Renombrar un archivo</h3>
        <form action="/renombrar">
          <div class="form-group">
            Nombre del archivo
            <input name="nombre" class="form-control"  />
          </div>
          <div class="form-group">
            Nuevo nombre del archivo
            <input name="nuevoNombre" class="form-control"  />
          </div>

          <button type="submit" class="btn btn-warning">
            Renombrar archivo
          </button>
        </form>
      </div>
      <!-- Eliminar -->
      <div class="col-12 col-sm-3 contaienr p-5">
        <h3>Eliminar un archivo</h3>
        <form action="/eliminar">
          <div class="form-group">
            Nombre del archivo
            <input name="archivo" class="form-control"  />
          </div>

          <button type="submit" class="btn btn-danger">Eliminar archivo</button>
        </form>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

  </body>
</html>
8.- Pasos para abril el índex.html desde views
import path from 'path';
const __dirname = path.resolve();

res.sendFile(__dirname + '/views/index.html');
9.- Creamos el filesystem fs y la ruta crear con una carpeta uploads
import fs from 'fs/‘promises;

router.get('/crear', (req, res) => {
    const { file, content } = req.query;
    fs.writeFile(`uploads/${file}`, content)
    res.send('Archivo creado')
});

10.- Archivo con fecha
const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();

fs.writeFile(`uploads/${file}`, `${dia}/${mes}/${anio} - ${content}`, 'utf-8')
11.- Archivo que el día y mes parta con 0 antes del 10
    fs.writeFile(`uploads/${file}`, `${dia < 10 ? '0'+dia : dia}/${mes < 10 ? '0'+mes : mes}/${anio} - ${content}`, 'utf-8')
12.- Lo dejamos con Try / Catch
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
13.- Con esto leemos el archivo
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
14.- Renombrar el archivo
router.get('/renombrar', async (req, res) => {
    const { nombre, nuevoNombre } = req.query;
    try {
        await fs.rename(`uploads/${nombre}`, `uploads/${nuevoNombre}`);
        res.send(`Archivo ${nombre} renombrado satisfactoriamente por ${nuevoNombre}`);
    } catch (error) {
        res.status(500).send("El archivo que consultas no existe");
    }
});
15.- Eliminar el archivo
router.get('/eliminar', async (req, res) => {
    const { archivo } = req.query;
    try {
        await fs.unlink(`uploads/${archivo}`);
        res.send(`Archivo ${archivo} eliminado satisfactoriamente`);
    } catch (error) {
        res.status(500).send("El archivo que consultas no existe");
    }
});
