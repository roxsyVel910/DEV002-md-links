const fs = require('fs');
const path = require('path');

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
  checkDir

}
= require('./app')


const mdLinks = (path, options) => {

  return new Promise((resolve, reject) => {

    if (fileExists(path)) {

     if (!checkPath(path)) {

      getAbsolutePath(path)
      .then((absolutePath) => {

        const files = checkDir(absolutePath)

        //console.log("files", files)

        extractLinks(files)

        .then((linkObjects) => {
          //console.log("link objeto",linkObjects)


          processLinks(linkObjects)


          .then((result) => console.log("result",result)) 

          //console.log("linkObjects", processLinks(linkObjects))

        })

        .catch((error) => reject(error));
      })
      .catch((error) => console.error(error))
    }


  }
  else {
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
  mdLinks
}
