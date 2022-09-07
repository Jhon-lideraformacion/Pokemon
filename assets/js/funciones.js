const crearFila = (pokemons, tabla) => {
    // Creo las filas
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        let fila = document.createElement("tr");
        fila.append(crearColumna(i + 1));
        fila.append(crearColumna(pokemon.name));
        fila.append(crearBotonInformacion(pokemon));
        tabla.append(fila);
    }
};
const crearFilaHabilidades = (habilidades, tabla) => {
    // Creo las filas
    for (let i = 0; i < habilidades.length; i++) {
        const habilidad = habilidades[i];
        let fila = document.createElement("tr");
        fila.append(crearColumna(habilidad.ability.name));
        fila.append(crearColumna(habilidad.is_hidden ? "Si" : "No"));
        fila.append(crearColumna(habilidad.slot));
        tabla.append(fila);
    }
};
const crearBotonInformacion = (pokemon) => {
    let columnaBtnInformacion = document.createElement("td");
    let btnInformacion = document.createElement("button");
    btnInformacion.innerHTML = "Información";
    btnInformacion.addEventListener("click", () => {
        // fetch("https://pokeapi.co/api/v2/pokemon/"+ pokemon.name) // Forma en la que lo pense
        fetch(pokemon.url) // Forma en la que lo hizo Daniel
            .then(procesarPeticion)
            .then(mostrarInformacion)
            .catch(imprimirError)
            .finally(imprimirFinal);
    });
    columnaBtnInformacion.append(btnInformacion);
    return columnaBtnInformacion;
};
const crearColumna = (celda, etiqueta = "td") => {
    let columna = document.createElement(etiqueta);
    columna.innerHTML = celda.toString();
    return columna;
};
const crearTabla = (id_tabla, titulosPrincipalesDeLasFilas) => {
    let tabla = document.createElement("table");
    tabla.id = id_tabla;
    let filaTitulo = document.createElement("tr");
    for (const fila of titulosPrincipalesDeLasFilas) {
        filaTitulo.append(crearColumna(fila, "th"));
        tabla.append(filaTitulo);
    }
    return tabla;
};
export const imprimirError = (error) => {
    console.log(new Error(`error ${error}`));
};
export const imprimirFinal = () => {
    console.log(`petición finalizada`);
};
export const procesarPeticion = (response) => {
    console.log(response);
    return response.json();
};
const mostrarInformacion = (propiedades) => {
    // Remover tabla principal 
    document.getElementById("pokemons")?.remove();
    console.log(propiedades);
    console.log(propiedades.name);
    console.log(propiedades.abilities);
    console.log(propiedades.abilities[0].ability.name);
    console.log(propiedades.abilities[0].is_hidden);
    console.log(propiedades.abilities[0].slot);
    console.log(propiedades.types);
    console.log(propiedades.types[0].type.name);
    console.log(propiedades.sprites.front_default);
    let tipoPokemon = [];
    let iconos = ["🔥", "🌊", "🌱", "😵🤢", "🐛", "🤸‍♀️", "💣", "⚡"];
    for (const tipo of propiedades.types) {
        tipoPokemon.push((tipo.type.name == "grass") ? tipo.type.name + iconos[2] :
            (tipo.type.name == "fire") ? tipo.type.name + iconos[0] :
                (tipo.type.name == "water") ? tipo.type.name + iconos[1] :
                    (tipo.type.name == "bug") ? tipo.type.name + iconos[4] :
                        (tipo.type.name == "flying") ? tipo.type.name + iconos[5] :
                            (tipo.type.name == "fighting") ? tipo.type.name + iconos[6] :
                                (tipo.type.name == "electric") ? tipo.type.name + iconos[7] :
                                    (tipo.type.name == "poison") ? tipo.type.name + iconos[3] : tipo.type.name);
    }
    console.log(tipoPokemon);
    // Nombre pokemon
    let nombre = document.createElement("h2");
    nombre.innerHTML = `${propiedades.name}`;
    // Label para tipo pokemon
    let tipo = document.createElement("label");
    tipo.innerHTML = `<br><b>Tipo:</b> ${tipoPokemon}`;
    // Label para habilidades pokemon
    let habilidad = document.createElement("label");
    habilidad.innerHTML = `<br><b>Habilidades:<b/>`;
    // Cargar imagen
    let imgPokemon = document.createElement("img");
    imgPokemon.id = propiedades.name;
    imgPokemon.src = propiedades.sprites.front_default;
    imgPokemon.alt = propiedades.name;
    let divDatosPokemon = document.getElementById("datosPokemon");
    divDatosPokemon?.append(nombre);
    divDatosPokemon?.append(imgPokemon);
    divDatosPokemon?.append(tipo);
    divDatosPokemon?.append(habilidad);
    // Creo La tabla
    let tabla = crearTabla("pokemons", ["Ability", "Is_hidden", "Slot"]);
    // Inserto la tabla en el body del HTML
    divDatosPokemon?.appendChild(tabla);
    // Creo la fila y la inserto en la tabla 
    crearFilaHabilidades(propiedades.abilities, tabla);
};
export const mostrarEnTabla = (json) => {
    console.log(json);
    let pokemons = json.results;
    console.log(pokemons);
    // Creo La tabla
    let tabla = crearTabla("pokemons", ["Id", "Nombre", "Acciones"]);
    // Inserto la tabla en el body del HTML
    document.body.appendChild(tabla);
    // Creo la fila y la inserto en la tabla 
    crearFila(pokemons, tabla);
};
//# sourceMappingURL=funciones.js.map