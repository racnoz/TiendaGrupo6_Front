<template>
  <q-page class="flex-fluid flex-center">
    <q-table
       title="Usuarios"
       :rows="usuarios"
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
         <span class="q-ml-sm">¿Desea eliminar a este usuario? </span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar usuario" @click="deleteRow()" color="primary" v-close-popup />
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
  name: 'listarUsuarios',
  data() {
   return {
     usuarios: [],
     eliminar: [],
     confirm: ref(false),
     columns: [
       {name: "cedulaUsuario", label: "Cedula", field: "cedulaUsuario", sortable: true},
        {name: "emailUsuario", label: "Correo", field: "emailUsuario"},
        {name: "nombreUsuario", label: "Nombre", field: "nombreUsuario"},
        {name: "password", label: "Password", field: "password"},
        {name: "usuario", label: "Usuario", field: "usuario"},
        {name: 'actions', label: 'Acciones', field: '', align: 'center'},

     ]
   }
},
methods:{
  loadUsers(){
    api.get("/listarUsuarios")
    .then(response => (this.usuarios = response.data
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
    const index = this.usuarios.indexOf(this.eliminar.row);
      api.delete("/eliminarUsuarios?cedula=" + this.eliminar.row.cedulaUsuario)
          .then(response => response.data)
          .catch(e => {
            console.log(e);
          });
      //this.loadUsers();
      this.usuarios.splice(index, 1);

    },
},
created(){
  this.loadUsers();
}
})
</script>
