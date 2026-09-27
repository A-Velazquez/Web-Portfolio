import fs from 'fs'


fs.readFile('./data/input.txt', 'utf-8', (err, contenido) => {
  if (err) {
    console.error('Error al leer el archivo:', err.message);
    return;
  }
  console.log('Contenido del archivo:');
  console.log(contenido);
});