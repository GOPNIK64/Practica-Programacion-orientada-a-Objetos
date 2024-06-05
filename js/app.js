const formulario = document.querySelector("#formulario");
const cartasEstudiantes = document.querySelector("#cartasEstudiantes");
const cartasProfesores = document.querySelector("#cartasProfesores");
const templateEstudiantes = document.querySelector("#templateEstudiantes").content
const templateProfesores = document.querySelector("#templateProfesores").content
const alert = document.querySelector(".alert")

const estudiantes = [];
const profesores = [];

document.addEventListener("click", (e) => {
    // console.log(e.target.dataset.nombre);
    if(e.target.dataset.uid) {
        // console.log(e.target.matches(".btn-success"));
        if(e.target.matches(".btn-success")){
            estudiantes.map(item => {
                if(item.uid === e.target.dataset.uid) {
                    item.setEstado = true
                }
                // console.log(item)
                return item
            });
        }
        if(e.target.matches(".btn-danger")){
            estudiantes.map(item => {
                if(item.uid === e.target.dataset.uid) {
                    item.setEstado = false
                }
                // console.log(item)
                return item
            });
        }
        Persona.pintarPersonaUI(estudiantes, "Estudiante")
    }
})

class Persona {
    constructor(nombre, edad){
        this.nombre = nombre
        this.edad = edad

        // para no tener problemas con nombres identicos
        this.uid = `${Date.now()}`;

        // Date.now() devuelve los milisegundos transcurridos desde las 00:00:00 UTC del 1 de enero de 1970
    }

    static pintarPersonaUI(personas, tipo){
        if(tipo === "Estudiante"){
            
            cartasEstudiantes.textContent = ""
            const fragment = document.createDocumentFragment()

            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cartasEstudiantes.appendChild(fragment);
        }

        if(tipo === "Profesor"){

            cartasProfesores.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoProfesor());
            });

            cartasProfesores.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona {
    #estado = false
    #estudiante = "Estudiante"

    set setEstado(estado) {
        this.#estado = estado;
    }
    get getEstudiante(){
        return this.#estudiante
    }

    agregarNuevoEstudiante() {
        // SIEMPRE CLONAR EL TEMPLATE
        const clone = templateEstudiantes.cloneNode(true);

        clone.querySelector("h5 .text-primary").textContent = this.nombre;
        clone.querySelector("h6").textContent = this.getEstudiante;
        clone.querySelector("p").textContent = this.edad;

        if (this.#estado) {
            clone.querySelector(".badge").className = "badge bg-success";
            clone.querySelector(".btn-success").disabled = true
            clone.querySelector(".btn-danger").disabled = false
        } else {
            clone.querySelector(".badge").className = "badge bg-danger";
            clone.querySelector(".btn-danger").disabled = true
            clone.querySelector(".btn-success").disabled = false
        }

        clone.querySelector(".badge").textContent = this.#estado 
            ? "Aprobado" 
            : "Reprobado";

        clone.querySelector(".btn-success").dataset.uid = this.uid;
        clone.querySelector(".btn-danger").dataset.uid = this.uid;

        return clone;
    }
}

class Profesor extends Persona {
    #profesor = "Profesor"

    agregarNuevoProfesor(){
        // SIEMPRE CLONAR EL TEMPLATE
        const clone = templateProfesores.cloneNode(true)
        clone.querySelector("h5").textContent = this.nombre
        clone.querySelector("h6").textContent = this.#profesor
        clone.querySelector("p").textContent = this.edad

        return clone;
    }
}

formulario.addEventListener("submit", e => {
    e.preventDefault()

    alert.classList.add("d-none");

    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];
    // console.log(nombre, edad, opcion);


    // IMPORTANTE PARA FORMULARIOS
    if(!nombre.trim() || !edad.trim() || !opcion.trim) {
        console.log("datos faltantes");
        alert.classList.remove("d-none");
        return;
    }

    if(opcion === "Estudiante"){
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);
    }

    if(opcion === "Profesor"){
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores, opcion);
    }

    
});









// // // CLASE DE POO
// // // funcion constructora
// // function Persona(nombre){
// //     this.nombre = nombre;
    
// //     // funciones
// //     this.saludar = function(){
// //         return `${this.nombre} dice hola`;
// //     };
// // };

// // // agrega un prototipo a la cadena de prototipos
// // Persona.prototype.saludarIngles = function () {
// //     return `${this.nombre} says hi!`;
// // };

// // const juanito = new Persona("juanito");
// // const pedrito = new Persona("pedrito");

// // console.log(juanito);
// // console.log(pedrito);

// // console.log(juanito.saludar());
// // console.log(pedrito.saludar());

// // practica con CONSTRUCTOR y CLASS

// class Persona {
//     constructor(nombre, edad) {
//         this.nombre = nombre;
//         this.edad = edad;
//     }

//     get getNombre(){
//         return this.nombre
//     }

//     set setNombre(nombre){
//         this.nombre = nombre
//     }

//     saludar(){
//         return `${this.nombre} dice holo`;
//     }

//     static probarSaludo(nombre){
//         return `${nombre} probando saludo`
//     }
// }

// // juanito.nombre = "pedrito";
// // juanito.setNombre = "pedrito";

// // console.log(juanito);
// // console.log(juanito.saludar());
// // console.log(juanito.getNombre);

// // console.log(Persona.probarSaludo("nachito"));


// // HEREDAR SPECS DE CLASS

// class Estudiante extends Persona {

//     // PRIVATE CLASS FIELDS #
//     // se usa # para hacer la propiedad privada
//     #nota = []

//     // POLIMORFISMO 
//     saludar(){
//         return `${this.nombre} desde estudiante`;
//     }

//     constructor(nombre, edad, nota = []) {
//         // llamar al super
//         super(nombre, edad);
//         this.#nota = nota;
//     }

//     set setNota(nota){
//         this.#nota.push(nota)
//     }

//     get getNota(){
//         return this.#nota
//     }
// }

// const juanito = new Estudiante ("juanito", 25);

// // console.log(juanito.saludar());

// console.log(juanito);

// juanito.setNota = 7;
// juanito.setNota = 9;
// juanito.setNota = 4;

// console.log(juanito.getNota);





