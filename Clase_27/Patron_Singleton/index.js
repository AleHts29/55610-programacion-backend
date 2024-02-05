

const SingletonClass = require('./singleton.js')

// Ejemplos
let clase_01 = SingletonClass.getInstance()
let clase_02 = SingletonClass.getInstance()
let clase_03 = SingletonClass.getInstance()

console.log(clase_01);
console.log(clase_02);
console.log(clase_03);