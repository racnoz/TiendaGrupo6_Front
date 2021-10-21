<template>
  <q-page class="flex flex-center">
    <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>

    <!-- tabla dinamica  -->
    <q-table
    style="position: absolute; top: 2%; width:95%; opacity: 0.9; border: solid 1px #ff846a !important"
       title="Clientes"
       :rows="clientes"
       :columns="columns"
       row-key="name"
        :filter="filter"
     >
     <template v-slot:body-cell-actions="props">
         <q-td :props="props">
           <q-btn dense round flat color="red" @click="displayDeleteDialog(props)" icon="delete"></q-btn>
           <q-btn dense round flat color="primary" @click="displayEditDialog(props)" icon="edit"></q-btn>
         </q-td>
       </template>
       <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

     </q-table>
     <!-- dialog de confirmación para eliminación -->
     <q-dialog v-model="confirm" persistent>
     <q-card>
       <q-card-section class="row items-center">
         <q-avatar icon="delete" color="primary" text-color="white" />
         <span class="q-ml-sm">¿Desea eliminar este cliente? </span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar cliente" @click="deleteRow()" color="primary" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>
    <!-- fin dialog de confirmación para eliminación -->
    <!-- dialog de edición -->
   <q-dialog v-model="confirmEdit" persistent>
   <q-card>
     <q-card-section class="row items-center">
       <q-avatar icon="edit" color="primary" text-color="white" />
       <span class="q-ml-sm text-h6">Editar Cliente </span>
     </q-card-section>
     <q-card-section class="row items-center">
       <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
       <div class="row">
              <div class="col q-px-sm">
                  <q-input v-model="cedulaCliente" label="Cedula" disable/>
              </div>
              <div class="col q-px-sm">
                  <q-input  v-model="direccionCliente" label="Dirección" />
              </div>
    </div>
    <div class="row">
              <div class="col q-px-sm">
                  <q-input v-model="emailCliente" label="Correo" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="nombreCliente" label="Nombre" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="telefonoCliente" label="Telefono" />
              </div>
    </div>
    <q-separator />
    </q-form>
     </q-card-section>
     <q-card-actions align="right">
       <q-btn flat label="Cancel" color="primary" v-close-popup />
       <q-btn flat label="Guardar Cambios" @click="onSubmit()" color="primary" v-close-popup />
     </q-card-actions>
   </q-card>
 </q-dialog>
 <!-- fin dialog de edición -->
     <q-separator/>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'listarClientes',
  data() {
   return {
     clientes: [], // aqui se colocan los clientes que usara la tabla dinamica
     eliminar: [],// se coloca el cliente a eliminar
     confirm: ref(false),
       confirmEdit: ref(false),
       filter: '',// se usa para tener lo que el usuario busca en el seach de la tabla
       cedulaCliente:"",
       direccionCliente:"",
       emailCliente:"",
       nombreCliente:"",
       telefonoCliente:"",
     columns: [
       {name: "cedulaCliente", label: "Cedula", field: "cedulaCliente", sortable: true},
        {name: "direccionCliente", label: "Dirección", field: "direccionCliente"},
        {name: "emailCliente", label: "Correo", field: "emailCliente"},
        {name: "nombreCliente", label: "Nombre", field: "nombreCliente"},
        {name: "telefonoCliente", label: "Telefono", field: "telefonoCliente"},
        {name: 'actions', label: 'Acciones', field: '', align: 'center'},
     ]
   }
},
methods:{
  loadUsers(){ // trae los clientes de la api
    api.get("/listarClientes")
    .then(response => (this.clientes = response.data
          ))
          .catch(e => {
            console.log(e);
          });
  },
  displayDeleteDialog(props){ // muestra o culpa el dialog tambien pasa información del objeto
    this.confirm = true
    this.eliminar = props
  },
  displayEditDialog(props){// muestra o culpa el dialog tambien pasa información del objeto
    this.confirmEdit = true
    this.confirm = props
    this.cedulaCliente = this.confirm.row.cedulaCliente  // a la propiedad cedulaUsuario que se creo en la data se le pasa la cedulaCliente que se guardo en el confirm al momento de darle al boton de editar de ese registro
    this.direccionCliente = this.confirm.row.direccionCliente
    this.emailCliente = this.confirm.row.emailCliente
    this.nombreCliente = this.confirm.row.nombreCliente
    this.telefonoCliente = this.confirm.row.telefonoCliente

  },
  deleteRow() { // elimina cliente
    const index = this.clientes.indexOf(this.eliminar.row);
      api.delete("/eliminarClientes?cedula=" + this.eliminar.row.cedulaCliente)
          .then(response => {
              this.triggerPositive (response.data, 'primary') //llamada a notify para mostrar notificacion en caso de succes
          })
          .catch(e => {
             this.triggerPositive ("No fue posible completar la operación!", 'negative')
          });
      //this.loadUsers();
      this.clientes.splice(index, 1);// borra cliente de la tabla ya que se elimino tambien del back pero la tabla no lo sabe


    },
  async  onSubmit(){ // evento que se usa desde el formulario de edicion
              await  api.post('/editarCliente?cedulaCliente='+this.cedulaCliente+'&direccionCliente='+this.direccionCliente+'&emailCliente='+this.emailCliente+'&nombreCliente='+this.nombreCliente+'&telefonoCliente='+this.telefonoCliente).then(response => {
                    console.log(response)
                    this.triggerPositive (response.data, 'primary') //llamada a notify para mostrar notificacion en caso de succes
                }).catch(e => {
                   console.log(e);
                     this.triggerPositive ("No fue posible completar la operación!", 'negative') //llamada a notify para mostrar notificacion en caso de error
                });
                this.loadUsers(); // se llama de nuevo la funcion que trae los usuarios para llenar la tabla asi se ve el cambio
          },
          triggerPositive (mensaje, color) {// funcion notify
     this.$q.notify({
        color: color,
        message: mensaje,
         position: 'bottom-right',
      })
    },
},
created(){// ejecuta codigo en una fase temprana de inicialización de la pagina
  this.loadUsers(); // llama el metodo que carga la tabla de información
}
})
</script>
