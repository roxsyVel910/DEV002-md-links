const fs = require('fs');
const path = require('path');
const axios = require('axios');
const mdFiles = [];

// regex para ver si es ruta absoluta
const regEx = /^(\/|[A-Za-z]:\\)/;
function isAbsolute(path) {
  return regEx.test(path);
}
// validando si es absoluta o relativa tmb esta convirtiendo la ruta relativa a absoluta
const changeToAbsolute = (ruta) => {
    if (isAbsolute(ruta)) {
        return ruta;
      } else {
        return path.resolve(ruta);
      }
}




/*const checkPath = (ruta) => {
  
  const files = fs.readdirSync(ruta);
  files.forEach(file => {
    const filePath = path.join(ruta, file)
    //console.log("filepath",filePath);
    const stats = fs.lstatSync(filePath);
   // console.log("fuera", stats)
    //console.log("extencion", path.extname(filePath) )
  if(stats.isDirectory()){
      checkPath(filePath);
    } else if(stats.isFile() && path.extname(filePath) === '.md'){
      mdFiles.push(filePath);
    }
  });
  return mdFiles;
} */
const checkPath = (dir) => {
  const stats = fs.lstatSync(dir);
  if (stats.isFile() && path.extname(dir) === '.md') {
    mdFiles.push(dir);
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      checkPath(filePath);
    });
  }
  return mdFiles;
}


const shareLinks = () => {

  

}



/*function findLinks(mdFiles) {
  const links = [];
  mdFiles.forEach(fileUrl => {
    axios
      .get(fileUrl)
      .then(response => {
        const content = response.data;
        const regex = /\[(.*?)\]\((.*?)\)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          links.push(match[2]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
  return links;
} */








  
//Función para leer los archivos
/* const readFiles = (path)=>{
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return err;
      }
    console.log("¿estás leyendo archivos?",data);

  });
  }*/
  

/*const mdFiles = [];

function checkPath(dir) {
  fs.lstat(dir, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("fills", path.extname(dir))
    console.log("file. md", )
    if (stats.isFile() && path.extname(dir) === '.md') {
      console.log(" dir ", dir);
    } else if (stats.isDirectory()) {
      fs.readdir(dir, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        
      });
    }
  });
} */








// esto es prueba

/*

const absoOurRelative = (path) => {
  return new Promise((resolve, reject) => {
    if (isAbsolute(path)) {
      resolve(path);
    } else {
      resolve(path.resolve(path));
    }
  });
};


const mdLinks = (path) => {

  console.log("absoluta booleano", isAbsolute(path));
  // path == relativa
  return new Promise((resolve, reject) => {
    // resolve =>  relativa al rutaectorio desde donde se invoca node


    // istat para saber si es una carpeta 
    fs.lstat(path, (err, stats) => {
      if (err) {
        console.error(err);
      } else if (stats.isrutaectory()) {
        console.log('Es una carpeta');
      } else if (stats.isFile()) {
        console.log('Es un archivo');
      } else {
        console.log('No es ni una carpeta ni un archivo');
      }
    });


    // funcion - chequear o convertir una ruta absoluta
    // probar si esa ruta absoluta  es una archivo o rutaectorio
    //  Si es un rutaectorio filtrar los archivos md. arry filtrado



  })
} */



module.exports = {
  changeToAbsolute,  checkPath

};