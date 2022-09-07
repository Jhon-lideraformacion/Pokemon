import { imprimirError, imprimirFinal, mostrarEnTabla, procesarPeticion } from './funciones.js';
(() => {
    let enlaceApiPredeterminado: string = 'https://pokeapi.co/api/v2/pokemon?limit=';
    let numeroDePokemons: string | null = prompt("Introduzca el número de Pokemons que quiere ver");

    fetch(enlaceApiPredeterminado+numeroDePokemons)
        .then(procesarPeticion)
        .then(mostrarEnTabla)
        .catch(imprimirError)
        .finally(imprimirFinal);

   







    /* Un código síncrono es aquel código donde cada instrucción espera a la anterior para ejecutarse
     mientras que un código asíncrono no espera a las instrucciones diferidas y continúa con su ejecución. */


   









})()