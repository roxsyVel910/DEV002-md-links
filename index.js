const fs = require("fs");
const path = require("path");

const {
  fileExists,
  checkPath,
  getAbsolutePath,
  extractLinks,
  processLinks,
  checkDir,
} = require("./app");
// mdLinks(path, options)

const mdLinks = (path, options = {validate: false, stats: false }) => {

    return new Promise((resolve, reject) => {
      resolve(5)
        if (options) {
            console.log('tienes una option')
           if (fileExists(path)) {
              if (!checkPath(path)) {
                getAbsolutePath(path)
                  .then((absolutePath) => {
                    const files = checkDir(absolutePath);
                    const renderFile = files.map((file) => extractLinks(file));
                    const promesa = Promise.all(renderFile);
                    //console.log("file", promesa)
                    promesa.then((result) => {
                      const planarArray = result.reduce(
                        (acc, val) => acc.concat(val),
                        []
                      );
                     // console.log("plana arr", planarArray);
                     processLinks(planarArray)
                     .then((result) => {
                      resolve(result)
                      }) 
                     .catch((error)=> console.log("error",error));
                     // console.log("validate",  validate)
                      
                    });
                  })
                  .catch((error) => console.error(error));
              }
            }  
            //reject  
                 
            } else {
                console.log('Please enter a valid option');
                //console.log(path)
            }
        
    })

}

module.exports = { mdLinks }

