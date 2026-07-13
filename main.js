
// SCRIPT PARA EL MODO CLARO / OSCURO (con persistencia entre páginas)

// Nos aseguramos de que todo el HTML cargue en el navegador antes de ejecutar 
// la logica, sino el getElementById puede no encontrar nada y tira error.
document.addEventListener('DOMContentLoaded', () => {

    // Buscamos el boton por su ID y agarramos toda la etiqueta body.
    const botonModo = document.getElementById('toggle-modo');
    const cuerpoPagina = document.body;

    // Funcion chiquita para no repetir codigo: actualiza el texto del boton 
    // segun el modo en el que estemos parados en ese momento.
    function actualizarTextoBoton() {
        if (cuerpoPagina.classList.contains('dark-mode')) {
            botonModo.textContent = ' Modo Claro';
        } else {
            botonModo.textContent = ' Modo Oscuro';
        }
    }

    //  PERSISTENCIA (localStorage) 
    // Al cargar cualquier pagina, nos fijamos si en una visita anterior 
    // el usuario había dejado activado el modo oscuro. localStorage guarda 
    // datos en el navegador que sobreviven aunque cambiemos de pagina o cerremos la pestaña.
    const modoGuardado = localStorage.getItem('tema');

    // Si lo que quedo guardado es 'oscuro', le clavamos la clase apenas carga la pagina, 
    // ANTES de que el usuario haga ningun click. Asi, si venia navegando en modo oscuro 
    // desde el index y clickea "Flota", la pagina nueva ya arranca oscura.
    if (modoGuardado === 'oscuro') {
        cuerpoPagina.classList.add('dark-mode');
    }

    // Ajustamos el texto del boton segun cómo haya quedado la pagina al cargar.
    actualizarTextoBoton();

    // Le decimos al boton que se quede "escuchando" a ver cuando el usuario le hace click.
    botonModo.addEventListener('click', () => {

        // Aca ocurre la magia nativa: toggle le mete la clase dark-mode al body 
        // si no la tiene, y se la saca si ya la tiene.
        cuerpoPagina.classList.toggle('dark-mode');

        // Actualizamos el texto del boton segun cómo quedo el modo despues del click.
        actualizarTextoBoton();

        // Guardamos la eleccion del usuario en localStorage, asi la proxima vez 
        // que entre a cualquier pagina del sitio (o recargue esta misma), 
        // el modo se mantiene tal cual lo dejo.
        if (cuerpoPagina.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'oscuro');
        } else {
            localStorage.setItem('tema', 'claro');
        }
    });
});