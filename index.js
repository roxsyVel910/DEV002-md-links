const fs = require("fs");
const path = require("path");

const {
  fileExists,
  checkPath,
  getAbsolutePath,
  extractLinks,
  processLinks,
  checkDir,
  statsValidate,
} = require("./app");
// mdLinks(path, options)

const mdLinks = (path, options = {validate: false, stats: false }) => {

    return new Promise((resolve, reject) => {
      
     console.log("lnks")
           if (fileExists(path)) {
              if (!checkPath(path)) {
                getAbsolutePath(path)
                  .then((absolutePath) => {
                    const files = checkDir(absolutePath);
                    const renderFile = files.map((file) => extractLinks(file));
                    
                    const promesa = Promise.all(renderFile);
                    promesa.then((result) => {
                      //console.log("resul",result.href)
                      const planarArray = result.reduce(
                        (acc, val) => acc.concat(val),
                        []
                      );
                     planarArray.forEach(element => {
                      console.log("Links",element.href)
                     });
                   /*  processLinks(planarArray)
                     .then((result) => {
                      resolve("mensaje", result)
                      }) 
                     .catch((error)=> console.log("error",error));*/
                     // console.log("validate",  validate)
                      
                    
            //reject  
            if (options.validate === true && options.stats === true) {
              console.log("dos opciones") 
              const statc = statsValidate(planarArray)
              console.log("stact",statc)


            }
            else if (options.validate === false && options.stats === true) {
              console.log(" opcion stats")
            }
            else if (options.validate === true && options.stats === false) {
              console.log("opcion validate ")
            }

          });
        })
    }

    
  } 


             else {
                console.log('Please error');
                //console.log(path)
            }
            
        
    })

}

module.exports = { mdLinks }

