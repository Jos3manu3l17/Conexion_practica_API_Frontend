// En esta linea obtenemos la referencia al botón de cargar usuarios
const btnCargar = document.getElementById("btnCargar");
// Obtener referencia al contenedor donde se mostrarán los usuarios
const listaUsuarios = document.getElementById("listaUsuarios");
// Agregar un evento al botón para cargar los usuarios cuando se haga clic
btnCargar.addEventListener("click", obtenerUsuarios);

async function obtenerUsuarios() {

    const respuesta = await fetch("http://localhost:8080/usuarios");

    const usuarios = await respuesta.json();

    mostrarUsuarios(usuarios);
}

function mostrarUsuarios(usuarios) {
// Limpiar la lista de usuarios antes de mostrar los nuevos datos
    listaUsuarios.innerHTML = "";
// Iterar sobre cada usuario y crear una tarjeta para mostrar su información
    usuarios.forEach(usuario => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("usuario");
        // Agregar el contenido de la tarjeta con la información del usuario
        tarjeta.innerHTML = `
            <h3>${usuario.nombre}</h3>
            <p>ID: ${usuario.idUsuario}</p>
            <p>Correo: ${usuario.correo}</p>
        `;
        // Agregar la tarjeta al contenedor de usuarios
        listaUsuarios.appendChild(tarjeta);
    });
}



const API_URL = "http://localhost:8080/usuarios";

// Elementos del HTML
const formulario = document.getElementById("formularioUsuario");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");

// Registrar un usuario
formulario.addEventListener("submit", async (evento) => {
    // Evita que el formulario recargue la página
    evento.preventDefault();

    // Obtener los datos escritos en el formulario
    const usuario = {
        nombre: campoNombre.value.trim(),
        correo: campoCorreo.value.trim()
    };

    try {
        // Enviar los datos al backend
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        // Comprobar si el servidor respondió con un error HTTP
        if (!respuesta.ok) {
            throw new Error("No se pudo registrar el usuario");
        }

        // Convertir la respuesta JSON en un objeto JavaScript
        const usuarioRegistrado = await respuesta.json();

        // Mostrar el resultado
        mensajeRegistro.textContent =
            `Usuario ${usuarioRegistrado.nombre} registrado correctamente.`;

        // Limpiar los campos
        formulario.reset();

    } catch (error) {
        mensajeRegistro.textContent =
            "No se pudo registrar el usuario. Verifica que el servidor esté funcionando.";

        console.error("Error al registrar:", error);
    }
});
