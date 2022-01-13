const http = require('http');
const url = require('url');
const fs = require('fs');

//Formato fecha:
let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
/*
if(month < 10){
  console.log(`${day}-0${month}-${year}`)
}else{
  console.log(`${day}-${month}-${year}`)
}
*/

const server = http.createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    //destructuring
    const archivo = params.archivo;
    const contenido = params.contenido;

    //Crear archivo
    if (req.url.includes('/crear')) {
        fs.writeFile(`archivos/${archivo}.txt`, `Fecha:${day}-${month}-${year}. ${contenido}`, () => {
            console.log('Archivo creado con éxito');
            res.write('Archivo creado con éxito');
            return res.end();
        });
    }

    //Leer un archivo
    if (req.url.includes('/leer')) {
        fs.readFile(`archivos/${archivo}.txt`, (err, data) => {
            console.log('archivo leído');
            res.write(data);
            return res.end();
                        
        });
    }

    if (req.url.includes('/renombrar')) {
        fs.rename(`archivos/${archivo}.txt`, `${archivo}.txt`, (err, data) => {
            console.log('archivo renombrado');
            res.write('archivo renombrado');
            res.end();
        });
    }

    if (req.url.includes('/eliminar')) {
        fs.unlink(`archivos/${archivo}.txt`, (err,data) => {
            console.log('Archivo eliminado');
            res.write('Archivo eliminado');
            res.end();
        });
    }

    //leer el index.html
    if (req.url.includes('/')) {
        fs.readFile('index.html', (err, data) => {
            if (err) return res.end('No se puede leer el HTML', () => null);
            return res.end(data, () => null);
        });
    }

});


const puerto = 5000;
server.listen(puerto, () => {
    console.log('Servidor corriendo en puerto: ' + puerto);
});

