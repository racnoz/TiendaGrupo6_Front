<template>
  <q-page class="flex flex-center">
  <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>
    <q-table
       style="position: absolute; top: 2%; width:95%; opacity: 0.9; border: solid 1px #ff846a !important"
       active-color="secondary"
       indicator-color="secondary"
       title="Usuarios"
       :rows="usuarios"
       :columns="columns"
       row-key="name"
       :filter="filter"
     >
     <template v-slot:body-cell-actions="props">
         <q-td :props="props">
           <q-btn dense round flat color="secondary" @click="displayDeleteDialog(props)" icon="delete"></q-btn>
           <q-btn dense round flat color="accent" @click="displayEditDialog(props)" icon="edit"></q-btn>
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
         <span class="q-ml-sm">¿Desea eliminar a este usuario? </span>
       </q-card-section>
       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar usuario" @click="deleteRow()" color="primary" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>
   <q-dialog v-model="confirmEdit" persistent>
   <q-card>
     <q-card-section class="row items-center">
       <q-avatar icon="edit" color="primary" text-color="white" />
       <span class="q-ml-sm text-h6">Editar Usuario </span>
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
                  <q-input v-model="cedulaUsuario" label="Cedula" disabled />
              </div>
              <div class="col q-px-sm">
                  <q-input  v-model="emailUsuario" label="Correo" />
              </div>
    </div>
    <div class="row">
              <div class="col q-px-sm">
                  <q-input v-model="nombreUsuario" label="Nombre" />
              </div>
              <div class="col q-px-sm">
                  <q-input type="password" v-model="password" label="Contraseña" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="usuario" label="Usuario" />
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
  name: 'listarUsuarios',
  data() {
   return {
     usuarios: [],
     eliminar: [],
     confirm: ref(false),
      confirmEdit: ref(false),
       filter: '',
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
  displayEditDialog(props){
    this.confirmEdit = true
    this.eliminar = props
  },
  deleteRow() {
    const index = this.usuarios.indexOf(this.eliminar.row);
      api.delete("/eliminarUsuarios?cedula=" + this.eliminar.row.cedulaUsuario)
          .then(response => {
            this.triggerPositive (response.data, 'primary');
          })
          .catch(e => {
            console.log(e);
          });
      //this.loadUsers();
      this.usuarios.splice(index, 1);
    },
    triggerPositive (mensaje, color) {
       this.$q.notify({
          color: color,
          message: mensaje,
           position: 'bottom-right',
        })
      },
},
created(){
  this.loadUsers();
}
})
</script>
<style> 
  td{
    border-bottom:solid 1px #ff846a !important;
    
  }
  th{
  border-bottom:solid 1px #ff846a !important;
  }
</style>