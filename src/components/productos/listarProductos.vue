<template>
  <q-page class="flex flex-center">
  <q-img alt="Fondo" src="../../assets/1234.jpg" style="width: 100%; height: 100%; margin: 0; opacity: 0.8 !important"/>
    <q-table
       style="position: absolute; top: 2%; width:95%; opacity: 0.9; border: solid 1px #ff846a !important"
       title="Productos"
       :rows="productos"
       :columns="columns"
       row-key="name"
    >
  </q-table>
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
     columns: [
       {name: "nitProveedor", label: "Nit", field: "nitProveedor", sortable: true},
        {name: "nombreProveedor", label: "Nombre", field: "nombreProveedor"},
        {name: "ciudadProveedor", label: "Ciudad", field: "ciudadProveedor"},
        {name: "direccionProveedor", label: "Dirección", field: "direccionProveedor"},
        {name: "telefonoProveedor", label: "Telefono", field: "telefonoProveedor"},
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
},
created(){
  this.loadUsers();
}
})
</script>
