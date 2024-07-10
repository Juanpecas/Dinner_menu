// Menús 
const menus = {
    desayuno: {
        platos: [
            { nombre: 'Pancakes', precio: 5.99 },
            { nombre: 'huevos al gusto', precio: 6.99 },
            { nombre: 'caldo de costilla', precio: 4.99 }
        ],
        guarniciones: [
            { nombre: 'Tostadas', precio: 1.99 },
            { nombre: 'Fruta', precio: 2.99 },
            { nombre: 'Yogurt', precio: 1.99 }
        ]
    },
    almuerzo: {
        platos: [
            { nombre: 'bandeja paisa', precio: 8.99 },
            { nombre: 'sancocho de gallina', precio: 7.99 },
            { nombre: 'arroz con pollo', precio: 6.99 }
        ],
        guarniciones: [
            { nombre: 'Papas Fritas', precio: 2.99 },
            { nombre: 'Ensalada', precio: 3.99 },
            { nombre: 'Helado', precio: 2.99 }
        ]
    },
    cena: {
        platos: [
            { nombre: 'horse bistec', precio: 10.99 },
            { nombre: 'pulpo al vapor', precio: 9.99 },
            { nombre: 'calentado de frijol', precio: 8.99 }
        ],
        guarniciones: [
            { nombre: 'chupito', precio: 3.99 },
            { nombre: 'cerveza', precio: 4.99 },
            { nombre: 'vino', precio: 3.99 }
        ]
    }
};

// Comentarios de la camarera
const comentarios = [
    "¡Buena elección!",
    "Eso suena delicioso.",
    "Esa es una opción popular.",
    "Espero que disfrutes tu comida.",
    "¡Qué buen gusto tienes!"
];

// Comentarios de la hora de comida
const comentariosHoraComida = {
    desayuno: [
        "¡Buenos días! Es hora de desayunar y comenzar tu día con energía.",
        "Es hora de desayunar. ¿Qué te gustaría comer esta mañana?",
        "Desayuno listo. ¡Elige tus platos favoritos para empezar bien el día!"
    ],
    almuerzo: [
        "Es la hora del almuerzo. ¿Qué te gustaría disfrutar esta tarde?",
        "¡Hora de almorzar! Perfecto para recargar energías para la tarde.",
        "Es el momento ideal para un buen almuerzo. ¿Qué te apetece?"
    ],
    cena: [
        "Buenas noches. Es hora de cenar y relajarse después de un largo día.",
        "Es la hora de la cena. Elige algo delicioso para terminar el día.",
        "Cena lista. ¡Perfecto para disfrutar una buena comida antes de descansar!"
    ]
};

// Función para seleccionar un comentario aleatorio
function obtenerComentarioAleatorio(comentarios) {
    const indice = Math.floor(Math.random() * comentarios.length);
    return comentarios[indice];
}

// Función para seleccionar un comentario aleatorio de comida
function obtenerComentarioAleatorios(comentariosHoraComida) {
    const indices = Math.floor(Math.random() * comentariosHoraComida.length);
    return comentariosHoraComida[indices];
}

// Función para mostrar el menú completo
function mostrarMenu(menu) {
    let mensaje = 'Menú de Platos Principales:\n';
    menu.platos.forEach((plato, index) => {
        mensaje += `${index + 1}. ${plato.nombre} - €${plato.precio.toFixed(2)}\n`;
    });
    mensaje += '\nMenú de Guarniciones:\n';
    menu.guarniciones.forEach((guarnicion, index) => {
        mensaje += `${index + 1}. ${guarnicion.nombre} - €${guarnicion.precio.toFixed(2)}\n`;
    });
    alert(mensaje);
}

// Función para seleccionar un artículo del menú con validación
function seleccionarArticulo(menu, tipo) {
    let seleccion = prompt(`Selecciona un ${tipo} (1-${menu.length}):`);
    if (seleccion === null) {
        alert("Proceso cancelado.");
        return null;
    }
    
    let seleccionNumerica = parseInt(seleccion, 10);
    
    while (isNaN(seleccionNumerica) || seleccionNumerica < 1 || seleccionNumerica > menu.length) {
        alert("Entrada no válida. Por favor, ingresa un número válido dentro del rango del menú.");
        seleccion = prompt(`Selecciona un ${tipo} (1-${menu.length}):`);
        if (seleccion === null) {
            alert("Proceso cancelado.");
            return null;
        }
        seleccionNumerica = parseInt(seleccion, 10);
    }

    const articulo = menu[seleccionNumerica - 1];
    alert(`Seleccionaste: ${articulo.nombre}\n${obtenerComentarioAleatorio(comentarios)}`);
    return articulo;
}

// Función para determinar el momento de la comida basado en la hora ingresada
function obtenerMomentoComida(hora) {
    const [hours, minutes] = hora.split(':').map(Number);
    if (hours >= 8 && hours < 10) {
        return 'desayuno';
    } else if (hours >= 11 && hours < 16) {
        return 'almuerzo';
    } else if (hours >= 17 && hours <= 23) {
        return 'cena';
    } else {
        return null;
    }
}

// Función principal para ejecutar el menú
function ejecutarMenu() {
    let momentoComida = null;
    while (!momentoComida) {
        const horaSeleccionada = prompt("Bienvenido a Bottega fast Food, horario atencion 08:00am a 23:00pm, Ingresa la hora (HH:MM) para seleccionar tu comida:");
        if (horaSeleccionada === null) {
            alert("Proceso cancelado.");
            return;
        }
        momentoComida = obtenerMomentoComida(horaSeleccionada);
        if (!momentoComida) {
            alert("Hora no válida. Por favor, ingresa una hora dentro de las franjas horarias permitidas.");
        }
    }

    // Obtener un comentario adecuado para la hora de la comida
    const comentarioHora = obtenerComentarioAleatorios(comentariosHoraComida[momentoComida]);
    alert(comentarioHora);

    const menu = menus[momentoComida];
    mostrarMenu(menu);

    // Selección de plato principal
    const platoPrincipal = seleccionarArticulo(menu.platos, 'plato principal');
    if (!platoPrincipal) return;  // Si el usuario cancela

    alert(`Precio del plato principal: €${platoPrincipal.precio.toFixed(2)}`);

    // Selección de guarniciones
    const guarnicion1 = seleccionarArticulo(menu.guarniciones, 'guarnición');
    if (!guarnicion1) return;  // Si el usuario cancela

    alert(`Precio de la primera guarnición: €${guarnicion1.precio.toFixed(2)}`);

    const guarnicion2 = seleccionarArticulo(menu.guarniciones, 'guarnición');
    if (!guarnicion2) return;  // Si el usuario cancela

    alert(`Precio de la segunda guarnición: €${guarnicion2.precio.toFixed(2)}`);

    // Sumar el costo total
    const costoTotal = platoPrincipal.precio + guarnicion1.precio + guarnicion2.precio;
    alert(`El costo total de tu comida es: €${costoTotal.toFixed(2)}`);
}

// Ejecutar el menú
ejecutarMenu();