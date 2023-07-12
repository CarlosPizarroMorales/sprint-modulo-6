// URL de la API
const apiUrlCrear = "http://localhost:8080/usuario";

// Instancia de Vue
new Vue({
  el: "#app",
  data: {
    nuevoUsuario: {
      rut: "",
      apellidos: "",
      nombres: "",
      cargo: ""
    }
  },
  methods: {
    guardarUsuario() {
      // Llamada a la API para guardar la capacitación utilizando el método POST
      axios.post(apiUrlCrear, this.nuevoUsuario)
      .then(response => {
        console.log("Usuario guardado:", response.data);
        Swal.fire({
          icon: "success",
          title: "Usuario",
          text: "El usuario se creó correctamente."
        })
        .then(() => {
          // Redirigir a la página inicio.html después de aceptar
          window.location.href = "inicio.html";
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al crear el usuario."
        });
      });
    }
  }
});
