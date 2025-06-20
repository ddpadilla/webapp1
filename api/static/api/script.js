const form = document.getElementById("registroForm");
const tablaUsuarios = document.getElementById("tablaUsuarios").querySelector("tbody");
const usuarioIdInput = document.getElementById("usuarioId");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = usuarioIdInput.value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;

  const datos = { nombre, apellido, email };

  let url = "http://127.0.0.1:8000/api/users/";
  let metodo = "POST";

  if (id) {
    url += id + "/";
    metodo = "PUT";
  }

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al enviar datos");
      return res.json();
    })
    .then(() => {
      form.reset();
      usuarioIdInput.value = "";
      cargarUsuarios();
    })
    .catch((err) => {
      console.error(err);
      alert("Hubo un error al guardar");
    });
});

function cargarUsuarios() {
  fetch("http://127.0.0.1:8000/api/users/")
    .then((res) => res.json())
    .then((data) => {
      tablaUsuarios.innerHTML = "";
      data.forEach((usuario) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.email}</td>
          <td>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
          </td>
        `;
        tablaUsuarios.appendChild(fila);
      });
    });
}

function editarUsuario(id) {
  fetch(`http://127.0.0.1:8000/api/users/${id}/`)
    .then((res) => res.json())
    .then((usuario) => {
      document.getElementById("nombre").value = usuario.nombre;
      document.getElementById("apellido").value = usuario.apellido;
      document.getElementById("email").value = usuario.email;
      usuarioIdInput.value = usuario.id;
    })
    .catch((err) => {
      console.error("Error al cargar usuario para edición", err);
    });
}

function eliminarUsuario(id) {
  if (!confirm("¿Eliminar este usuario?")) return;

  fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
    method: "DELETE",
  })
    .then(() => {
      cargarUsuarios();
    })
    .catch((err) => {
      console.error("Error al eliminar usuario", err);
    });
}

// Carga inicial
cargarUsuarios();
