// URL de la APIcapacitacion.js
const baseUrl = "http://localhost:8080/usuario";
document.addEventListener('submit', enviarModificacion);


// Instancia de Vue
const app = new Vue({
  el: "#app",
  data: {
    usuarios: [],
    detalleUsuario: {
    	id: "",
    	rut: "",
    	nombres: "",
    	apellidos: "",
    	cargo: ""
    }
  },
  mounted() {
    // Llamada a la API para obtener la lista de empleados
    axios.get(baseUrl + '/listar')
    .then(response => {
      this.usuarios = response.data;
      console.log(this.usuarios);
    })
    .catch(error => {
      console.error(error);
    });
  },
  methods: {
    mostrarDetalle(id) {
      // Llamada a la API para obtener el detalle del empleado
      axios.get(`${baseUrl}/${id}`)
      .then(response => {
      
        this.detalleUsuario = response.data;
        Swal.fire({
          icon: "info",
          title: "Detalle",
          html: 
          `<section id="detalle">
            <p>ID: ${this.detalleUsuario.id}</p>
            <p>Rut: ${this.detalleUsuario.rut}</p>
            <p>Nombres: ${this.detalleUsuario.nombres}</p>
            <p>Apellidos: ${this.detalleUsuario.apellidos}</p>
            <p>Cargo: ${this.detalleUsuario.cargo}</p>
          </section>`
        }); 
        console.log(this.detalleUsuario);
      })
      .catch(error => {
        console.error(error);
      });
    },
    eliminar(id) {
      // Llamada a la API para obtener el detalle del empleado
      // axios.delete(apiUrlEliminar + id)
      fetch(baseUrl + "/" + id, {method: "DELETE"})
      .then(response => {
    
        Swal.fire({
          icon: "success",
          title: "Usuario Eliminado",
          text: "El usuario se eliminó correctamente."
        }).then(() => {
          window.location.reload();
        });    
    
      })
      .catch(error => {         
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al eliminar el usuario."
        });        
      });
    },
    actualizar(id){
    
      Swal.fire({
        target: '#app',
        title: "Editar usuario:",
        showConfirmButton: false,
        html:
        //<form @submit.prevent="modificarCapacitacion">
        `
        <form id="form">
          <input type="text" name="id" v-model="${id}" value="${id}" hidden>
          <div class="form-group">
            <label for="rut">Rut:</label>
            <input type="text" class="form-control" id="rut" name="rut" v-model="detalleUsuario.rut" required>
          </div>
          <div class="form-group">
            <label for="nombres">Nombres:</label>
            <input type="text" class="form-control" id="nombres" name="nombres" v-model="detalleUsuario.nombres" required>
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos:</label>
            <input type="text" class="form-control" id="apellidos" name="apellidos" v-model="detalleUsuario.apellidos" required>
          </div>
          <div class="form-group">
            <label for="cargo">Cargo:</label>
            <input type="text" class="form-control" id="cargo" name="cargo" v-model="detalleUsuario.cargo" required>
          </div>
          <button type="submit" class="btn btn-primary">Enviar modificación</button>
        </form>
        `
      }) // end Swal.fire
           
    }, 	// end actualizar
  }	
});


function enviarModificacion(e){
	e.preventDefault();
	const dataUsuario = {};
	Array.from(e.target).forEach(input => dataUsuario[input.name] = input.value);
	
  axios.put(baseUrl + '/' + dataUsuario.id, dataUsuario)
  .then(response => {
    console.log("Usuario modificado:", response.data);
    Swal.fire({
      icon: "success",
      title: "Usuario modificada",
      text: "La capacitación se modificó correctamente."
    })
    .then(() => {
      // Recargar la página después de aceptar
      window.location.reload();
    });
  })
  .catch(error => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al modificar la capacitación."
    });
  });
}

