const fs = require('fs');
const path = require('path');
const axios = require('axios');

const mdFiles = [];

// si es¡xiste el archivo
const fileExists = (ruta) => {
  return fs.existsSync(ruta);
}

// si es absoluta
const checkPath = (ruta) => {
  return path.isAbsolute(ruta)
}

//convierte a absoluta
const getAbsolutePath = (relativePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(relativePath);
    if (absolutePath) {
      resolve(absolutePath);
    } else {
      reject('No se pudo obtener la ruta absoluta.');
    }
  });
}


// archivo con terminacion .m
const isMdFile = (filePath) => {
  return path.extname(filePath) === '.md';
};

// es directorio
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
};

const isDirectory = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
};




const checkDir= (dir)  => {
  const stats = fs.lstatSync(dir);
  if (stats.isFile() && path.extname(dir) === '.md') {
    mdFiles.push(dir);
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      checkDir(filePath);
    });
  }
  return mdFiles;
}



const extractLinks = (arrfiles) => {
  // console.log("ruta", ruta);
  // console.log('Sí en tra a extractLinks')
  return new Promise((resolve, reject) => {
    const links = [];
    arrfiles.forEach(file => {

     fs.readFile(`${file}`, 'utf-8', (error, fileContents) => {
      if (error) {
        return reject(error);
      } else {

        const regex = /\[(.*)\]\((https?:\/\/\S+)\)/g;

        let match;
        while ((match = regex.exec(fileContents))) {
          links.push({
            text: match[1],
            href: match[2],
            file: `${file}`
          });
        }
        //console.log("links app",links)

        resolve(links);
      }
    });

   });

    
  });
};

// Extract links devuelve lo siguiente
// [
//   {
//     text: 'Alguna pagina',
//     href: 'https://www.algunaPagina.com/',
//     file: 'ruta/lalala.md'
//   },
//   {
//     text: 'Algun Otra pagina',
//     href: 'https://www.algunaOtraPagina.com/',
//     file: 'ruta/lalala2.md'
//   }
// ]




const validateLinks = (links) => {
  // console.log('Sí entra a validateLinks')
  return new Promise((resolve, reject) => {
    axios
    .get(links)
    .then((response) => {

      const contStatus = response.status;
      const contStatusText = response.statusText;

      resolve({ contStatus, contStatusText })
    })
    .catch((error) => error)
  })
};




const processLinks = (linkObjects) => {

  return new Promise((resolve, reject) => {
    const arrLinks = linkObjects.map(link => {
        // console.log("linkss", link)
        //const linkHref = link.href

      validateLinks(link.href)

      .then((result) => {

        //console.log("linkHref app", result)
       const linkValidate = {
        ...link,
        ...result
      }
    // return linkValidate
      console.log("link validateejkds",linkValidate)
      
     // resolve(linkValidate)
     
      
    })

        /*.catch((err) => {
        //console.log(err.errno);
        const objectValidate = {
          ...link,
          status: err.response ? 404 : 'ERROR',
          ok: "fail"
        }*/
     
      //return arrLinks 
    });

     console.log("arrpromesa",arrLinks);

    

  })
  

  
}

/*
const processLinks = (arrayLinks) => {
  const validate = arrayLinks.map((link) => {
    return axios.get(link.href)
      .then((result) => {
        const objectValidate = {
          ...link,
          status: result.status,
          ok: result.statusText
        }
        //console.log(objectValidate)
        return objectValidate

      })
      .catch((err) => {
        //console.log(err.errno);
        const objectValidate = {
          ...link,
          status: err.response ? 404 : 'ERROR',
          ok: "fail"
        }
        //console.log(objectValidate)
        return objectValidate
      })
  })

  return Promise.all(validate)

} 


const processLinks = (arrayOfObjects) => {
  // console.log('Sí entra a createLinkObject')
  return Promise.all(
    arrayOfObjects.map((link) => {
   
      const enlace = link.href;
      // console.log(enlace)
      return validateLinks(enlace)
        .then((response) => {
          // console.log(response)
          const obj =  {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.contStatus,
            ok: response.contStatus === 200 ? 'OK' : 'FAIL',
          };
           console.log("obj app",obj)
          return obj;
        })
        .catch((error) => {
          // console.log(error);
          const obj = {
            href: link.href,
            text: link.text,
            file: link.file,
            status: 'ERROR',
            ok: 'ERROR',
          };
       console.log("obj app",obj)
          return obj;
        });
    })
  );
}; 

*/

module.exports = {
  fileExists,
  checkPath,
  getAbsolutePath,
  isMdFile,
  readDir,
  isDirectory,
  extractLinks,
  validateLinks,
  processLinks,
  checkDir
  
};
