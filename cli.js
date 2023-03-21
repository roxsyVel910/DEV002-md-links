#!/usr/bin/env node
//console.log('hello wordl')

const { error } = require('console');
const process = require('process');
const { mdLinks } = require('./index.js');
//console.log(process)
//argv  argumentos que vamos a escribir en la terminal

const path = process.argv[2]
//console.log(path)
const opcion1 = process.argv[3]
//console.log(opcion1) validate
const opcion2 = process.argv[4]
//console.log(opcion2) stats

if (path) {
    if (opcion1 === undefined && opcion2 === undefined) {
        console.log("llamada sin opciones")

        mdLinks(path, { validate: false, stats: false })

            .then(result =>{
                result.forEach(element => {
                    console.log(`${element.href}  ${element.text}`)
                    
                });
            })


    } else if (opcion1 === '--validate' && opcion2 === undefined) {
        console.log("llamada opcion validate")
        mdLinks(path, { validate: true, stats: false })
            .then(result => console.log("--validate",result))
    } else if (opcion1 === '--stats' && opcion2 === undefined) {
        mdLinks(path, { validate: false, stats: true })
            .then(result => result)
    } else if ((opcion1 === '--validate' && opcion2 === '--stats') || (opcion1 === '--stats' && opcion2 === '--validate')) {
        mdLinks(path, { validate: true, stats: true })
            .then((result) =>  {
                console.log(result )
                //console.log(`Total: ${totalLinks}`);
                //console.log(`Broken: ${brokenLinks.length}`);
                
            })
    } else {
        console.log('error en parametro')
    }
}




