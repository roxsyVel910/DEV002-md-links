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
                      resolve("mensaje", result)
                      }) 
                     .catch((error)=> console.log("error",error));
                     // console.log("validate",  validate)
                      
                    });
                  })
                  .catch((error) => console.error(error));
              }

              
            }  
            //reject  
            if (options.validate === true && options.stats === true) {
              console.log("elegiste ambas opciones") 
            }
            else if (options.validate === false && options.stats === true) {
              console.log("elegiste la opción stats")
            }
            else if (options.validate === true && options.stats === false) {
              console.log("elegiste la opción validate ")
            }


             else {
                console.log('Please error');
                //console.log(path)
            }
            
        
    })

}

module.exports = { mdLinks }

