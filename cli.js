#!/usr/bin/env node
//console.log('hello wordl')

const { error } = require('console');
const process = require('process');
const { mdLinks } = require('./index.js');
//console.log(process)
//argv  argumentos que vamos a escribir en la terminal

const route = process.argv[2]
//console.log(route)
const opcion1 = process.argv[3]
//console.log(opcion1) validate
const opcion2 = process.argv[4]
//console.log(opcion2) stats

if (route) {
    if (opcion1 === undefined && opcion2 === undefined) {
      const promesas = mdLinks(route, { validate: false, stats: false });
      console.log("promesas", promesas)

            promesas.then(result => console.log("result",result)) .catch((error) => console.log("error",error))

           // console.log("mostrar solo solo ruta")
    }else {
        console.log('error')
    }
}




