<template>
  <q-page class="flex-fluid flex-center">
    <q-table
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
                  <q-input v-model="cedulaCliente" label="Cedula" />
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
       <q-btn flat label="Guardar Cambios" @click="deleteRow()" color="primary" v-close-popup />
     </q-card-actions>
   </q-card>
 </q-dialog>

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
     clientes: [],
     eliminar: [],
     confirm: ref(false),
       confirmEdit: ref(false),
       filter: '',
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
  loadUsers(){
    api.get("/listarClientes")
    .then(response => (this.clientes = response.data
          ))
          .catch(e => {
            console.log(e);
          });
  },
  displayDeleteDialog(props){
    this.confirm = true
    this.eliminar = props
  },
  displayEditDialog(props){
    this.confirmEdit = true
    this.eliminar = props
  },
  deleteRow() {
    const index = this.clientes.indexOf(this.eliminar.row);
      api.delete("/eliminarClientes?cedula=" + this.eliminar.row.cedulaCliente)
          .then(response => response.data)
          .catch(e => {
            console.log(e);
          });
      //this.loadUsers();
      this.clientes.splice(index, 1);

    },
},
created(){
  this.loadUsers();
}
})
</script>
