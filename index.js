const fs = require("fs");
const path = require("path");

const {
  fileExists,
  checkPath,
  getAbsolutePath,
  isMdFile,
  readDir,
  isDirectory,
  extractLinks,
  validateLinks,
  processLinks,
  checkDir,
  planarArray
} = require("./app");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (fileExists(path)) {
      if (!checkPath(path)) {
        getAbsolutePath(path)
          .then((absolutePath) => {
            const files = checkDir(absolutePath);
            const renderFile = files.map((file) => extractLinks(file))
            const promesa = Promise.all(renderFile)

            //console.log("file", promesa)
            promesa.then((result) => {
              planarArray(result)
              .then()
              console.log("plana array",planarArray(result))
              })
          

              
          })
          .catch((error) => console.error(error));
      }
    } else {
      reject(`La ruta ${path} no existe.`);
    }
  });
};

// if(fs.existsSync(path)){

// const objFalse = processLinks(extractLinks(path))
//////console.log("objs false", objFalse)
////  objFalse
//.then(console.log)
// console.log("es relatiuva",pathRelative(path))
// console.log("es relatiuva",changeToAbsolute(path))

//console.log("mdlinks",checkPath(path));
//   validateLinks(['http://google.com/ '])
//  .then(({contStatus, contStatusText}) => console.log({contStatus, contStatusText}))
//  .catch((error) => console.error(error))
// console.log("leer archivo", readFiles(path))
//console.log( findLinks())

// } else {
//reject("la ruta no existe")
//  }

module.exports = {
  mdLinks,
};
