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
const mdLinks = (path, options) => {
  
    return new Promise((resolve, reject) => {
        if (options[0] === undefined && options[1] === undefined) {
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
    
        } else {
            if ((options[0] === '--validate' && options[1] === '--stats') || (options[0] === '--stats' && options[1] === '--validate')) {
                console.log('Entered options : --validate and --stats');
                // console.log(path)
               /* if (fileExists(path)) {
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
                }*/
            } else if (options[0] === '--validate') {
                console.log('Entered option: --validate');
                // console.log(path)
               /* if (fileExists(path)) {
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
                }**/

                
            } else if (options[0] === '--stats') {
                console.log('Entered options: --stats')
                console.log(path);
               /* if (fileExists(path)) {
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
                }*/
            } else {
                console.log('Please enter a valid option');
                //console.log(path)
            }
        }
    })
}

module.exports = { mdLinks }

// const array3 = getAllMdDFiles('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder');
// console.log(array3);
// const array4 = getAllMdDFiles('C:/Users/palva/OneDrive/Documents/proyectosLaboratoria/DEV002-md-links/test/folder/anotherFolder/randomStuff/theRaven.md');
// console.log(array4);