<template>
  <q-page class="flex flex-center">
    <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>

      <!-- tabla dinamica  -->
    <q-table
    style="position: absolute; top: 2%; width:95%; opacity: 0.9; border: solid 1px #ff846a !important"
       title="Proveedores"
       :rows="proveedores"
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
         <span class="q-ml-sm">¿Desea eliminar este proveedor? </span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat label="Cancel" color="primary" v-close-popup />
         <q-btn flat label="Eliminar proveedor" @click="deleteRow()" color="primary" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>
   <!-- fin dialog de confirmación para eliminación -->
   <!-- dialog de edición -->
   <q-dialog v-model="confirmEdit" persistent>
   <q-card>
     <q-card-section class="row items-center">
       <q-avatar icon="edit" color="primary" text-color="white" />
       <span class="q-ml-sm text-h6">Editar Proveedor </span>
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
                  <q-input v-model="nitProveedor" label="Nit" />
              </div>
              <div class="col q-px-sm">
                  <q-input  v-model="nombreProveedor" label="Nombre" />
              </div>
    </div>
    <div class="row">
              <div class="col q-px-sm">
                  <q-input v-model="ciudadProveedor" label="Ciudad" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="direccionProveedor" label="Dirección" />
              </div>
              <div class="col q-px-sm">
                  <q-input v-model="telefonoProveedor" label="Telefono" />
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
 <!-- fin dialog de edición -->
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
     proveedores: [],// aqui se colocan los proveedores que usara la tabla dinamica
     eliminar: [],// se coloca el proveedor a eliminar
     confirm: ref(false),
     confirmEdit: ref(false),
     filter: '',// se usa para tener lo que el usuario busca en el seach de la tabla
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
  loadUsers(){// trae los proveedores de la api
    api.get("/listarProveedores")
    .then(response => (this.proveedores = response.data
          ))
          .catch(e => {
            console.log(e);
          });
  },
  displayDeleteDialog(props){// muestra o culpa el dialog tambien pasa información del objeto
    this.confirm = true
    this.eliminar = props
  },
  displayEditDialog(props){// muestra o culpa el dialog tambien pasa información del objeto
    this.confirmEdit = true
    this.eliminar = props
  },
  deleteRow() { // elimina proveedor
    const index = this.proveedores.indexOf(this.eliminar.row);
      api.delete("/eliminarProveedor?nit=" + this.eliminar.row.nitProveedor)
          .then(response => response.data)
          .catch(e => {
            console.log(e);
          });
      //this.loadUsers();
      this.proveedores.splice(index, 1);// borra proveedor de la tabla ya que se elimino tambien del back pero la tabla no lo sabe

    },
},
created(){// ejecuta codigo en una fase temprana de inicialización de la pagina
  this.loadUsers();// llama el metodo que carga la tabla de información
}
})
</script>
