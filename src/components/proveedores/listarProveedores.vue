<template>
  <q-page class="flex-fluid flex-center">
    <q-table
       title="Proveedores"
       :rows="proveedores"
       :columns="columns"
       row-key="name"
     >
     <template v-slot:body-cell-actions="props">
         <q-td :props="props">
           <q-btn dense round flat color="red" @click="displayDeleteDialog(props)" icon="delete"></q-btn>
         </q-td>
       </template>
     </q-table>
     <q-dialog v-model="confirm" persistent>
     <q-card>
       <q-card-section class="row items-center">
         <q-avatar icon="delete" color="primary" text-color="white" />
         <span class="q-ml-sm">¿Desea eliminar este proveedor? </span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar proveedor" @click="deleteRow()" color="primary" v-close-popup />
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
  name: 'listarProveedor',
  data() {
   return {
     proveedores: [],
     eliminar: [],
     confirm: ref(false),
     columns: [
       {name: "nitProveedor", label: "Nit", field: "nitProveedor", sortable: true},
        {name: "nombreProveedor", label: "Nombre", field: "nombreProveedor"},
        {name: "ciudadProveedor", label: "Ciudad", field: "ciudadProveedor"},
        {name: "direccionProveedor", label: "Dirección", field: "direccionProveedor"},
        {name: "telefonoProveedor", label: "Telefono", field: "telefonoProveedor"},
        {name: 'actions', label: 'Acciones', field: '', align: 'center'},
     ]
   }
},
methods:{
  loadUsers(){
    api.get("/listarProveedores")
    .then(response => (this.proveedores = response.data
          ))
          .catch(e => {
            console.log(e);
          });
  },
  displayDeleteDialog(props){
    this.confirm = true
    this.eliminar = props
  },
  deleteRow() {
    const index = this.proveedores.indexOf(this.eliminar.row);
      api.delete("/eliminarProveedor?nit=" + this.eliminar.row.nitProveedor)
          .then(response => response.data)
          .catch(e => {
            console.log(e);
          });
      //this.loadUsers();
      this.proveedores.splice(index, 1);

    },
},
created(){
  this.loadUsers();
}
})
</script>
